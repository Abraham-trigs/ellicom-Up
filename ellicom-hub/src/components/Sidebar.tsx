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
  const [scrollingDown, setScrollingDown] = useState(false);
  const [mounted, setMounted] = useState(false); // NEW
  const pathname = usePathname();

  // Auto-hide on scroll (mobile)
  useEffect(() => {
    setMounted(true); // Ensure this component is client-rendered before showing sidebar
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setScrollingDown(current > lastScroll && current > 50);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <>
      {/* Toggle button visible only on small screens */}
      <div className="md:hidden px-4 py-2 flex items-center justify-between border-t border-border bg-surface text-textPrimary">
        <span className="font-medium">Menu</span>
        <button onClick={() => setOpen((prev) => !prev)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar menu */}
      <AnimatePresence>
        {(open || typeof window !== "undefined") && (
          <motion.aside
            key="sidebar"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: open ? "auto" : 0,
              opacity: open ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden md:overflow-visible md:block bg-surface text-textPrimary 
              ${scrollingDown && !open ? "hidden" : ""} 
              w-[80%] md:w-full md:border-b border-border`}
          >
            <nav className="flex flex-col md:flex-row-reverse md:justify-end">
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
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
