"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import LayoutShell from "@/components/layout/layoutshell/admin/layoutShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LayoutShell>{children}</LayoutShell>
    </ThemeProvider>
  );
}
