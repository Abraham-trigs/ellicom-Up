"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, UserCircle } from "lucide-react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (status === "loading") return null;

  if (!session) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 rounded bg-gold dark:bg-gold text-head dark:text-head font-semibold hover:bg-highGold dark:hover:bg-highGold transition"
      >
        Login
      </Link>
    );
  }

  const user = session.user;

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-hover dark:hover:bg-hover transition focus:outline-none"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        {user?.image ? (
          <img
            src={user.image}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <UserCircle className="w-8 h-8 text-textPrimary dark:text-textPrimary" />
        )}
        <span className="text-textPrimary dark:text-textPrimary font-semibold max-w-[100px] truncate">
          {user?.name || user?.email || "User"}
        </span>
        <ChevronDown className="w-4 h-4 text-textPrimary dark:text-textPrimary" />
      </button>

      {dropdownOpen && (
        <ul className="absolute right-0 mt-1 w-40 bg-surface dark:bg-surface border border-border dark:border-border rounded shadow-lg py-1 z-50">
          <li>
            <button
              onClick={() => {
                setDropdownOpen(false);
                signOut();
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
