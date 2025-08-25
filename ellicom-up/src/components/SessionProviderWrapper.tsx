// components/SessionProviderWrapper.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSessionStore } from "@/lib/store/SessionStore";

interface SessionProviderWrapperProps {
  children: ReactNode;
}

export default function SessionProviderWrapper({
  children,
}: SessionProviderWrapperProps) {
  const [hydrated, setHydrated] = useState(false);
  const { fetchSession, logout } = useSessionStore();

  useEffect(() => {
    setHydrated(true);

    // 1️⃣ Fetch current session on mount
    fetchSession().catch(console.error);

    // 2️⃣ Auto-logout at next midnight
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      logout();
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [fetchSession, logout]);

  if (!hydrated) return null; // Prevent SSR/CSR hydration mismatch

  return <>{children}</>;
}
