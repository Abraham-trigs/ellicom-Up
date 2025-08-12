import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return <>{children}</>;
}
