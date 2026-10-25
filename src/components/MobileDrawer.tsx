"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import TodayDate from "./TodayDate";

interface NavItem {
  slug: string;
  title: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: NavItem[];
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  categories,
  onOpenSearch,
  onOpenBookmarks,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const { user, signOut, bookmarks } = useAuth();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="animate-slide-in-right relative ml-auto flex h-full w-[85vw] max-w-sm flex-col bg-paper shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-rule/80 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Image
              height={32}
              width={32}
              src="/logo.webp"
              alt="বাংলা নিউজ ২৪ লোগো"
              className="rounded-full ring-1 ring-rule"
            />
            <span className="text-base font-black tracking-tight text-ink">
              বাংলা নিউজ <span className="text-accent">২৪</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="rounded-full p-1.5 text-muted hover:bg-paper-deep hover:text-ink"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Date & Quick Tools Bar */}
        <div className="flex items-center justify-between border-b border-rule/60 bg-paper-deep/40 px-4 py-2 text-xs">
          <TodayDate />
          <ThemeToggle showLabel />
        </div>

        {/* User Account Card */}
        <div className="border-b border-rule/60 p-4">
          {user ? (
            <div className="flex items-center justify-between rounded-xl border border-rule/70 bg-paper-deep/30 p-3">
              <Link
                href="/auth"
                onClick={onClose}
                className="flex items-center gap-3 min-w-0"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-accent bg-paper">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-ink">{user.name}</p>
                  <p className="text-[10px] text-accent font-semibold">{user.role}</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="rounded-lg border border-rule/80 px-2.5 py-1 text-[11px] font-bold text-muted hover:border-accent hover:text-accent"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/auth"
                onClick={onClose}
                className="flex items-center justify-center rounded-lg border border-ink py-2 text-xs font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                সাইন ইন
              </Link>
              <Link
                href="/auth"
                onClick={onClose}
                className="flex items-center justify-center rounded-lg bg-accent py-2 text-xs font-bold text-paper transition-colors hover:bg-accent-deep"
              >
                নিবন্ধন
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-muted uppercase">
            প্রধান বিভাগসমূহ
          </p>
          <div className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "bg-accent text-paper font-bold"
                  : "text-ink hover:bg-paper-deep/60"
              }`}
            >
              <span>হোম</span>
              <span className="text-xs opacity-60">→</span>
            </Link>

            {categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-accent text-paper font-bold"
                      : "text-ink hover:bg-paper-deep/60"
                  }`}
                >
                  <span>{cat.title}</span>
                  <span className="text-xs opacity-60">→</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions in Drawer */}
          <div className="mt-6 border-t border-rule/60 pt-4 space-y-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="flex w-full items-center gap-3 rounded-lg border border-rule/80 px-3 py-2 text-xs font-semibold text-ink-soft hover:border-accent hover:text-accent"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>খবর অনুসন্ধান করুন...</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBookmarks();
              }}
              className="flex w-full items-center justify-between rounded-lg border border-rule/80 px-3 py-2 text-xs font-semibold text-ink-soft hover:border-accent hover:text-accent"
            >
              <span className="flex items-center gap-3">
                <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.01l-7.234 4.557A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1Z" />
                </svg>
                <span>সংরক্ষিত সংবাদ</span>
              </span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                {bookmarks.length}
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-rule/80 bg-paper-deep/30 p-4 text-center text-[10px] text-muted">
          <p>© বাংলা নিউজ ২৪ • সত্যের সন্ধানে নির্ভীক</p>
        </div>
      </div>
    </div>
  );
}
