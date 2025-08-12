"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "./admin/Sidebar";
import Navbar from "./Navbar";

const roleRoutes: Record<string, string> = {
  SUPERADMIN: "/superadmin",
  ADMIN: "/admin",
  SECRETARY: "/secretary",
  STAFF: "/staff",
  CLIENT: "/client",
  GUEST: "/auth/login", // fallback for unauthenticated users
};

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait for session to load

    const role = session?.user?.role || "GUEST";

    // If current path isn't the allowed route for the role, redirect
    const allowedRoute = roleRoutes[role] || "/auth/login";

    // Prevent redirect loop: Only redirect if we're NOT already on allowedRoute
    if (window.location.pathname !== allowedRoute) {
      router.replace(allowedRoute);
    }
  }, [status, session, router]);

  // Optional: While loading session, show loading spinner or placeholder
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row min-h-0">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 bg-surface overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
