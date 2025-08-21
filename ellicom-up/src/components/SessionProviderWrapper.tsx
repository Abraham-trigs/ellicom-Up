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

  // ensure Zustand rehydration before rendering
  useEffect(() => {
    setHydrated(true);
  }, []);

  // optional: you can also access session store here
  const { user, token, isAuthenticated } = useSessionStore();

  if (!hydrated) {
    // prevents hydration mismatch between SSR & client
    return null;
  }

  return <SessionContext>{children}</SessionContext>;
}

// optional context-like component
function SessionContext({ children }: { children: ReactNode }) {
  const session = useSessionStore();

  return <>{children}</>;
}
