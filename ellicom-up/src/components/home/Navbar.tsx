"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";
import clsx from "clsx";
import AuthButton from "../auth/AuthButton";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
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
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-gold dark:text-highGold font-extrabold text-xl select-none hover:text-high dark:hover:text-highGold transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Ellicom Hub
          </Link>
        </div>

        {/* Center - Auth Button */}
        <div className="flex-1 flex justify-center">
          <AuthButton />
        </div>

        {/* Right - Nav Links + Controls */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-head dark:text-textPrimary font-semibold">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="hover:text-gold dark:hover:text-highGold transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Controls: Dark mode toggle + Hamburger */}
          <div className="flex items-center gap-4">
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
              className="md:hidden p-2 rounded-md hover:bg-hover transition"
            >
              {isOpen ? (
                <X className="text-head dark:text-textPrimary" size={24} />
              ) : (
                <Menu className="text-head dark:text-textPrimary" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with staggered fade & slide */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-container dark:bg-surface flex flex-col gap-4 px-5 py-4 text-head dark:text-textPrimary font-semibold overflow-hidden"
          >
            {navLinks.map(({ name, href }) => (
              <motion.li key={name} variants={itemVariants}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-gold dark:hover:text-highGold transition-colors"
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
