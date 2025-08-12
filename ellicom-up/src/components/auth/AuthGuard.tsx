import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const publicRoutes = ["/auth/login", "/auth/signup"];

  useEffect(() => {
    // If loading, do nothing yet
    if (status === "loading") return;

    const userRole = session?.user?.role || "GUEST";
    const onPublicRoute = publicRoutes.includes(router.pathname);

    // If user role is GUEST or no session, allow access only to public routes
    if ((userRole === "GUEST" || !session) && !onPublicRoute) {
      router.push("/auth/login");
    }
  }, [status, session, router]);

  if (status === "loading") return <div>Loading...</div>;

  return <>{children}</>;
}
