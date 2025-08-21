"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session / token logic
    localStorage.removeItem("token"); // example
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 p-4 hover:bg-hover dark:hover:bg-surface rounded ${className}`}
    >
      Logout
    </button>
  );
}
