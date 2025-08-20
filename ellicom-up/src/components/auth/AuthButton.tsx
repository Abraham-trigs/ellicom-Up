"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, UserCircle } from "lucide-react";

export default function AuthButton() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fetch current user from JWT cookie
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <button
        onClick={() => router.push("/auth/login")}
        className="px-4 py-2 rounded bg-gold dark:bg-gold text-ground dark:text-head font-semibold hover:bg-highGold dark:hover:bg-highGold transition"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-hover dark:hover:bg-hover transition focus:outline-none"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <UserCircle className="w-8 h-8 text-textPrimary dark:text-textPrimary" />
        <span className="text-textPrimary dark:text-textPrimary font-semibold max-w-[100px] truncate">
          {user?.name || user?.email || "User"}
        </span>
        <ChevronDown className="w-4 h-4 text-textPrimary dark:text-textPrimary" />
      </button>

      {dropdownOpen && (
        <ul className="absolute right-0 mt-1 w-40 bg-surface dark:bg-surface border border-border dark:border-border rounded shadow-lg py-1 z-50">
          <li>
            <button
              onClick={async () => {
                setDropdownOpen(false);
                await fetch("/api/auth/logout", { method: "POST" });
                setUser(null);
                router.push("/auth/login");
              }}
              className="block w-full text-left px-4 py-2 text-textPrimary dark:text-textPrimary hover:bg-ground dark:hover:bg-ground transition"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
