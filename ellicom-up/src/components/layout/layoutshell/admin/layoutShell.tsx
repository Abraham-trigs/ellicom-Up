"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSessionStore } from "@/lib/store/SessionStore";
import AdminSidebar from "@/components/layout/layoutshell/admin/AdminSidebar";
import Navbar from "@/components/layout/Navbar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return <div>Loading...</div>; // or redirect spinner
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row min-h-0">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-6 bg-surface overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
