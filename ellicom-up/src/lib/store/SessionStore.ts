// stores/sessionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "GUEST" | "SUPERADMIN" | "ADMIN" | "SECRETARY" | "STAFF" | "CLIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface SessionState {
  user: User | null;
  token: string | null;
  expiresAt: number | null;
  hydrated: boolean;
  isLoggedIn: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;

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
      expiresAt: null,
      hydrated: false,
      isLoggedIn: false,

      login: (user, token) => {
        set({ user, token, isLoggedIn: true });

        // Clear existing timeout if any
        if (midnightTimeout) clearTimeout(midnightTimeout);

        // Calculate milliseconds until next midnight
        const now = new Date();
        const nextMidnight = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          0, 0, 0, 0
        );
        const msUntilMidnight = nextMidnight.getTime() - now.getTime();

        // Set timeout to logout at midnight
        midnightTimeout = setTimeout(() => {
          get().logout();
        }, msUntilMidnight);
      },

      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
        if (midnightTimeout) {
          clearTimeout(midnightTimeout);
          midnightTimeout = null;
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
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();

        // Recalculate midnight timeout after hydration
        const session = state?.getState?.();
        if (session?.isLoggedIn) {
          const now = new Date();
          const nextMidnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 0, 0
          );
          const msUntilMidnight = nextMidnight.getTime() - now.getTime();
          midnightTimeout = setTimeout(() => session.logout(), msUntilMidnight);
        }
      },
    }
  )
);
