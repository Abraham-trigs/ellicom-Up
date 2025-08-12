"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/auth/login", "/auth/signup"];

  useEffect(() => {
    if (status === "loading") return;

    const userRole = session?.user?.role || "GUEST";
    const onPublicRoute = publicRoutes.includes(pathname);

    if ((userRole === "GUEST" || !session) && !onPublicRoute) {
      router.push("/auth/login");
    }
  }, [status, session, router, pathname]);

  if (status === "loading") return <div>Loading...</div>;

  return <>{children}</>;
}
