"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/lib/store/SessionStore";
import { Button } from "@/components/ui/button";

export default function ToDashboardButton() {
  const router = useRouter();
  const { user } = useSessionStore();

  // ✅ Match your actual folder structure
  const roleRoutes: Record<string, string> = {
    SUPERADMIN: "/superadmin", // app/superadmin/page.tsx
    ADMIN: "/admin", // app/admin/page.tsx
    SECRETARY: "/secretary", // app/secretary/page.tsx (create if not yet)
    STAFF: "/staff", // app/staff/page.tsx (create if not yet)
    CLIENT: "/client", // app/client/page.tsx (create if not yet)
  };

  const handleRedirect = () => {
    if (user?.role && roleRoutes[user.role]) {
      router.push(roleRoutes[user.role]);
    } else {
      router.push("/auth/login"); // fallback
    }
  };

  if (!user) return null;

  return (
    <Button
      onClick={handleRedirect}
      className="mt-4 rounded-xl px-6 py-2 text-base font-medium"
    >
      Go to Dashboard
    </Button>
  );
}
