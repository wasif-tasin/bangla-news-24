"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface MobileBottomNavProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
}

export default function MobileBottomNav({
  onOpenDrawer,
  onOpenSearch,
  onOpenBookmarks,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { user, bookmarks } = useAuth();

  return (
    <nav
      aria-label="মোবাইল নেভিগেশন"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-rule/80 bg-paper/95 backdrop-blur-md md:hidden"
    >
      <div className="flex h-14 items-center justify-around px-2">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 transition-colors ${
            pathname === "/" ? "text-accent" : "text-muted hover:text-ink"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={pathname === "/" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[10px] font-bold">হোম</span>
        </Link>

        {/* Categories / Drawer */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 text-muted transition-colors hover:text-ink"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="text-[10px] font-bold">বিভাগ</span>
        </button>

        {/* Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 text-muted transition-colors hover:text-ink"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="text-[10px] font-bold">খুঁজুন</span>
        </button>

        {/* Bookmarks */}
        <button
          type="button"
          onClick={onOpenBookmarks}
          className="relative flex flex-col items-center justify-center gap-1 py-1 px-2.5 text-muted transition-colors hover:text-ink"
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={bookmarks.length > 0 ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={`h-5 w-5 ${bookmarks.length > 0 ? "text-accent fill-accent" : ""}`}
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            {bookmarks.length > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-black text-paper">
                {bookmarks.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">বুকমার্ক</span>
        </button>

        {/* Profile / Auth */}
        <Link
          href="/auth"
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 transition-colors ${
            pathname === "/auth" ? "text-accent" : "text-muted hover:text-ink"
          }`}
        >
          {user ? (
            <div className="relative h-5 w-5 overflow-hidden rounded-full ring-1 ring-accent">
              <Image
                src={user.avatar}
                alt={user.name}
                width={20}
                height={20}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
          <span className="text-[10px] font-bold">
            {user ? "প্রোফাইল" : "লগইন"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
