// stores/session.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole =
  | "GUEST"
  | "SUPERADMIN"
  | "ADMIN"
  | "SECRETARY"
  | "STAFF"
  | "CLIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface SessionState {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  isLoggedIn: boolean;

  login: (user: User, token: string, expiresAt: string) => void;
  logout: () => void;
  fetchSession: () => Promise<void>;
  isAuthenticated: () => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  setHydrated: () => void;
}

let midnightTimeout: NodeJS.Timeout | null = null;

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      hydrated: false,
      isLoggedIn: false,

      login: (user, token, expiresAt) => {
        set({ user, token, isLoggedIn: true });

        // Clear previous timer
        if (midnightTimeout) clearTimeout(midnightTimeout);

        // Calculate milliseconds until expiration (from backend)
        const now = new Date();
        const expiryDate = expiresAt ? new Date(expiresAt) : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
        const msUntilExpiry = expiryDate.getTime() - now.getTime();

        // Auto logout at expiry
        midnightTimeout = setTimeout(() => get().logout(), msUntilExpiry);
      },

      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
        if (midnightTimeout) {
          clearTimeout(midnightTimeout);
          midnightTimeout = null;
        }

        // Optional: clear server cookie
        fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(console.error);
      },

      fetchSession: async () => {
        try {
          const res = await fetch("/api/auth/me", { method: "GET", credentials: "include" });
          const data = await res.json();

          if (res.ok && data.success && data.user) {
            get().login(data.user, data.token, data.expiresAt);
          } else {
            get().logout();
          }
        } catch (err) {
          console.error("Failed to fetch session:", err);
          get().logout();
        } finally {
          get().setHydrated();
        }
      },

      isAuthenticated: () => !!get().token,

      hasRole: (roles: UserRole | UserRole[]) => {
        const { user } = get();
        if (!user) return false;
        return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
      },

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "ellicom-session",
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => () => {
        const session = useSessionStore.getState();
        session.setHydrated();
      },
    }
  )
);
