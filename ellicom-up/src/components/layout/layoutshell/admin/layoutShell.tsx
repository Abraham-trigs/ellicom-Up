"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AdminSidebar from "@/components/layout/layoutshell/admin/AdminSidebar";
import Navbar from "@/components/layout/Navbar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session) {
      router.replace("/auth/login"); // redirect if not logged in
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // No role check — sidebar always shown
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
