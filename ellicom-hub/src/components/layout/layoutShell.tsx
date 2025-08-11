"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col">
      {/* Navbar always at the top */}
      <Navbar />

      {/* Content area adapts between mobile (stacked) and desktop (side-by-side) */}
      <div className="flex flex-1 flex-col md:flex-row min-h-0">
        {/* Sidebar — mobile dropdown pushes content, desktop locks left */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-surface overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
