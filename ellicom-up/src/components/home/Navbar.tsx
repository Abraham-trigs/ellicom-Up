"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";
import clsx from "clsx";
import AuthButton from "../auth/AuthButton";
import ToDashboardButton from "./ToDashbaordButton";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    // { name: "Home", href: "/" },
    // { name: "Features", href: "/features" },
    // { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
        ease: easeOut,
        duration: 0.25,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { when: "afterChildren", duration: 0.2, ease: easeIn },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full z-50 bg-container dark:bg-surface backdrop-blur-md transition-shadow duration-300",
        scrolled ? "shadow-md shadow-black/40" : "shadow-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between relative">
        {/* === Mobile / Small Screen Container === */}
        <div className="flex items-center w-full justify-between md:hidden">
          {/* Logo */}
          <Link
            href="/"
            className="text-gold dark:text-highGold font-extrabold text-xl select-none hover:text-high dark:hover:text-highGold transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Ellicom Hub
          </Link>

          {/* Dashboard button centered */}
          <div className="flex-1 flex justify-center">
            <ToDashboardButton />
          </div>

          {/* Hamburger + Dark Mode Toggle */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                aria-label="Toggle Dark Mode"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md hover:bg-hover transition"
              >
                {theme === "dark" ? (
                  <Sun className="text-highGold" size={20} />
                ) : (
                  <Moon className="text-darkSea" size={20} />
                )}
              </button>
            )}
            <button
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-hover transition"
            >
              {isOpen ? (
                <X className="text-head dark:text-textPrimary" size={24} />
              ) : (
                <Menu className="text-head dark:text-textPrimary" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* === Desktop / md and above === */}
        <div className="hidden md:flex items-center justify-between w-full relative">
          {/* Logo left */}
          <Link
            href="/"
            className="text-gold dark:text-highGold font-extrabold text-xl select-none hover:text-high dark:hover:text-highGold transition-colors"
          >
            Ellicom Hub
          </Link>

          {/* Centered AuthButton */}
          <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <AuthButton />
          </div>

          {/* Right: Nav Links + Dashboard button */}
          <div className="flex items-center gap-4">
            <ul className="flex gap-8 text-head dark:text-textPrimary font-semibold">
              {navLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="hover:text-gold dark:hover:text-highGold transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <ToDashboardButton />
            </div>
          </div>
        </div>
      </div>

      {/* === Mobile Menu === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-container dark:bg-surface flex flex-col gap-4 px-5 py-4 text-head dark:text-textPrimary font-semibold overflow-hidden"
          >
            {navLinks.map(({ name, href }) => (
              <motion.div key={name} variants={itemVariants}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-gold dark:hover:text-highGold transition-colors"
                >
                  {name}
                </Link>
              </motion.div>
            ))}

            {/* AuthButton inside mobile menu */}
            <div className="flex flex-col gap-2 pt-2">
              <AuthButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
