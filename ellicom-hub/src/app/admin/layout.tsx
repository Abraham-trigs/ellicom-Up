import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      {/* Sidebar stays on the left */}

      {/* Right section with Navbar and page content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <Sidebar />

        <main className="p-4 bg-surface flex-1">{children}</main>
      </div>
    </div>
  );
}
