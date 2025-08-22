// hooks/useHydrateSession.ts
import { useEffect } from "react";
import { useSessionStore } from "@/lib/store/SessionStore";

export function useHydrateSession() {
  const login = useSessionStore((s) => s.login);
  const logout = useSessionStore((s) => s.logout);
  const setHydrated = useSessionStore((s) => s.setHydrated);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMe = async () => {
      try {
        // Try /me endpoint first
        const res = await fetch("/api/auth/me", { credentials: "include", signal });
        const data = await res.json();

        if (data.success && data.user && data.token) {
          login(data.user, data.token);
        } else {
          // Fallback to /refresh if /me fails
          const refreshRes = await fetch("/api/auth/refresh", { method: "POST", credentials: "include", signal });
          const refreshData = await refreshRes.json();

          if (refreshData.forceLogout) {
            logout();
            return;
          }

          if (refreshData.success && refreshData.user && refreshData.token) {
            login(refreshData.user, refreshData.token);
          } else {
            logout();
          }
        }
      } catch (err) {
        // Silent fail on network or abort errors
        if (err.name !== "AbortError") console.error("Session hydration error:", err);
      } finally {
        setHydrated();
      }
    };

    fetchMe();

    return () => controller.abort(); // Cleanup on unmount
  }, [login, logout, setHydrated]);
}
