"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use resolvedTheme, which resolves system if theme === 'system'
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 mt-6 px-4 py-2 
                 bg-gold text-power hover:bg-highGold
                 dark:bg-surface dark:text-textSecondary dark:hover:bg-borderAlt
                 border border-border rounded transition-colors duration-300"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">{isDark ? "Light Theme" : "Dark Theme"}</span>
    </button>
  );
}
