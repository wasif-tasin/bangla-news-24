"use client";

import { useTheme } from "@/context/ThemeContext";
import { useSyncExternalStore } from "react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const emptySubscribe = () => () => {};

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <button
        aria-label="থিম পরিবর্তন"
        className={`flex items-center gap-2 rounded-full border border-rule/80 p-2 text-muted transition-colors hover:border-ink ${className}`}
        type="button"
      >
        <span className="h-4 w-4 opacity-0" />
        {showLabel && <span className="text-xs">থিম</span>}
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "লাইট মোডে পরিবর্তন করুন" : "ডার্ক মোডে পরিবর্তন করুন"}
      title={isDark ? "লাইট মোড" : "ডার্ক মোড"}
      className={`group relative flex items-center gap-2 rounded-full border border-rule/80 bg-paper-deep/60 px-2.5 py-1.5 text-xs font-semibold text-ink-soft transition-all duration-300 hover:border-accent hover:bg-paper-deep hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {/* Sun Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute h-4 w-4 transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 text-amber-600 opacity-100"
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute h-4 w-4 transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 text-sky-400 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>

      {showLabel && (
        <span className="text-[11px] font-bold tracking-wider">
          {isDark ? "ডার্ক" : "লাইট"}
        </span>
      )}
    </button>
  );
}
