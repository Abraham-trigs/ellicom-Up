"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const roleRoutes: Record<string, string> = {
  SUPERADMIN: "/superadmin/dashboard",
  ADMIN: "/admin/dashboard",
  SECRETARY: "/secretary/dashboard",
  STAFF: "/staff/dashboard",
  CLIENT: "/client/dashboard",
};

export default function ToDashboardButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") return null; // Hide if not logged in

  const role = session?.user?.role ?? ""; // default fallback
  const dashboardRoute = roleRoutes[role] || "/auth/login";

  return (
    <button
      onClick={() => router.push(dashboardRoute)}
      className="px-4 py-2 bg-gold text-background rounded hover:bg-highGold transition"
      aria-label="Go to dashboard"
    >
      Dashboard
    </button>
  );
}
