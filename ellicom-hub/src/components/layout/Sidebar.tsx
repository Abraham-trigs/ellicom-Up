"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Jobs", icon: Briefcase, href: "/admin/jobs" },
  { label: "Clients", icon: Users, href: "/admin/clients" },
  { label: "Invoices", icon: FileText, href: "/admin/invoices" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ===== Top bar toggle for mobile ===== */}
      <div className="md:hidden px-4 py-2 flex items-center justify-between border-b border-border bg-surface text-textPrimary">
        <span className="font-medium">Menu</span>
        <button onClick={() => setOpen((prev) => !prev)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* ===== Sidebar for desktop (always visible) ===== */}
      <aside className="hidden md:block w-60 bg-surface text-textPrimary border-r border-border min-h-screen">
        <nav className="flex flex-col">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-2 p-4 transition-colors
                  ${
                    isActive
                      ? "bg-border text-white"
                      : "hover:bg-border hover:text-white"
                  }`}
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto h-2 w-2 rounded-full bg-gold"
                  />
                )}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* ===== Sidebar for mobile (slides in from left) ===== */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed z-50 top-0 left-0 h-full w-[80%] bg-surface text-textPrimary border-r border-border md:hidden"
          >
            <nav className="flex flex-col mt-14">
              {navItems.map(({ label, icon: Icon, href }) => {
                const isActive = pathname === href;
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)} // Close after click
                    className={`flex items-center gap-2 p-4 transition-colors
                      ${
                        isActive
                          ? "bg-border text-white"
                          : "hover:bg-border hover:text-white"
                      }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="ml-auto h-2 w-2 rounded-full bg-gold"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
