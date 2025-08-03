"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Right section: Navbar on top, content below */}
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 bg-surface overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
