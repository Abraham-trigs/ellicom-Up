"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full px-4 py-2 bg-high dark:bg-background border-b border-border flex items-center justify-between transition-colors duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/ellicom-logo.svg"
          alt="Ellicom Logo"
          width={32}
          height={32}
          priority
          className="h-8 w-auto object-contain"
        />
        <span className="text-power dark:text-textPrimary font-bold text-xl tracking-wide">
          Ellicom
        </span>
      </Link>

      {/* (Future nav items go here) */}
      <div className="hidden sm:flex"></div>
    </header>
  );
}
