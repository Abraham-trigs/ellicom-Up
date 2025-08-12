"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, UserCircle } from "lucide-react";

export default function AuthButton() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (status === "loading") return null;

  if (!session) {
    return (
      <button
        onClick={() => router.push("/auth/login")}
        className="px-4 py-2 rounded bg-gold dark:bg-gold text-ground dark:text-head font-semibold hover:bg-highGold dark:hover:bg-highGold transition"
      >
        Login
      </button>
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
          <div className="relative w-8 h-8">
            <Image
              src={user.image}
              alt="User avatar"
              fill
              className="rounded-full object-cover"
              sizes="32px"
            />
          </div>
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
