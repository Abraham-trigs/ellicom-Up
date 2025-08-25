"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/lib/store/SessionStore";
import { Button } from "@/components/ui/button";

export default function ToDashboardButton() {
  const router = useRouter();
  const { user, isAuthenticated } = useSessionStore();

  const roleRoutes: Record<string, string> = {
    SUPERADMIN: "/superadmin",
    ADMIN: "/admin",
    SECRETARY: "/secretary",
    STAFF: "/staff",
    CLIENT: "/client",
  };

  const handleRedirect = () => {
    if (isAuthenticated() && user?.role && roleRoutes[user.role]) {
      router.push(roleRoutes[user.role]);
    } else {
      router.push("/auth/login");
    }
  };

  if (!isAuthenticated()) return null;

  return (
    <Button
      onClick={handleRedirect}
      className="
    hidden sm:inline-block 
    ml-4
    rounded-xl 
    px-4 py-2 
    text-sm sm:text-base 
    bg-gold dark:bg-gold 
    text-ground dark:text-head 
    hover:bg-highGold dark:hover:bg-highGold 
    transition
  "
    >
      Dashboard
    </Button>
  );
}
