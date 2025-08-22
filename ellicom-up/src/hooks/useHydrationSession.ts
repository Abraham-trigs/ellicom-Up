// hooks/useHydrateSession.ts
import { useEffect } from "react";
import { useSessionStore } from "@/stores/sessionStore";

export function useHydrateSession() {
  const login = useSessionStore((s) => s.login);
  const setHydrated = useSessionStore((s) => s.setHydrated);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.success && data.user && data.token) {
          login(data.user, data.token);
        } else {
          // If /me fails, try refreshing
          const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
          const refreshData = await refreshRes.json();
          if (refreshData.success && refreshData.user && refreshData.token) {
            login(refreshData.user, refreshData.token);
          }
        }
      } catch {
        // silent fail
      } finally {
        setHydrated();
      }
    };

    fetchMe();
  }, [login, setHydrated]);
}
