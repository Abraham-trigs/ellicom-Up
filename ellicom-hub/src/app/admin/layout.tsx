import type { ReactNode } from "react";
import LayoutShell from "@/components/layout/layoutShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <LayoutShell>{children}</LayoutShell>;
}
