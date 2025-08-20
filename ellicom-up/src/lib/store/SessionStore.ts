// stores/sessionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface SessionState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean; // helper
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isAuthenticated: () => !!get().token, // quick auth check
    }),
    {
      name: "ellicom-session", // key in localStorage
      // optional: only persist `user` + `token`, not methods
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
