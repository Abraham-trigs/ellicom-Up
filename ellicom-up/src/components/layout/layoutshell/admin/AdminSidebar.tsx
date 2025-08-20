"use client";

import { useState, useEffect, useRef } from "react";
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
  Boxes,
  UserCog,
  PlusCircle,
  Tag,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Jobs", icon: Briefcase, href: "/admin/jobs" },
  { label: "Clients", icon: Users, href: "/admin/clients" },
  { label: "Invoices", icon: FileText, href: "/admin/invoices" },
  { label: "Stocks", icon: Boxes, href: "/admin/stocks" },
  { label: "Team", icon: UserCog, href: "/admin/team" },
  { label: "Pricing", icon: Tag, href: "/admin/pricing" },
  { label: "Add Job", icon: PlusCircle, href: "/admin/addJob" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile hamburger toggle + dropdown */}
      <div
        className="
          md:hidden px-4 py-2 flex flex-col 
          border-b border-border bg-container dark:bg-surface 
          text-head dark:text-textPrimary relative
        "
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">Menu</span>
          <button onClick={() => setOpen((prev) => !prev)} className="ml-auto">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-dropdown"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              ref={dropdownRef}
              className="
                w-[70%] max-h-[80vh] overflow-y-auto mt-2 ml-auto
                bg-container dark:bg-surface
                border border-border
                rounded-xl shadow-xl
                text-head dark:text-textPrimary
              "
            >
              {navItems.map(({ label, icon: Icon, href }) => {
                const isActive = pathname === href;
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-2 p-4 transition-colors
                      ${
                        isActive
                          ? "bg-ground text-head dark:text-head"
                          : "hover:bg-hover hover:text-head dark:hover:text-head"
                      }
                    `}
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
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sidebar */}
      <aside
        className="
          hidden md:block w-60 
          bg-container dark:bg-surface
          text-head dark:text-textPrimary
          border-r border-border 
          min-h-screen
        "
      >
        <nav className="flex flex-col">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <a
                key={label}
                href={href}
                className={`
                  flex items-center gap-2 p-4 transition-colors
                  ${
                    isActive
                      ? "bg-ground text-head dark:text-head"
                      : "hover:bg-hover hover:text-head dark:hover:text-head"
                  }
                `}
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
    </>
  );
}
