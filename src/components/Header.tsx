"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TodayDate from "./TodayDate";
import ThemeToggle from "./ThemeToggle";
import SearchModal from "./SearchModal";
import BookmarksModal from "./BookmarksModal";
import MobileDrawer from "./MobileDrawer";
import MobileBottomNav from "./MobileBottomNav";
import { useAuth } from "@/context/AuthContext";

const defaultCategories = [
  { slug: "politics", title: "রাজনীতি" },
  { slug: "world", title: "বিশ্ব" },
  { slug: "economy", title: "অর্থনীতি" },
  { slug: "health", title: "স্বাস্থ্যসেবা" },
  { slug: "sports", title: "খেলা" },
  { slug: "technology", title: "তথ্যপ্রযুক্তি" },
  { slug: "video", title: "ভিডিও" },
];

const HeaderPage = () => {
  const { user, signOut, bookmarks } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    fetch("https://news-api-v2.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          const scrapable = data.data
            .filter((item: { scrapable: boolean }) => item.scrapable)
            .map((item: { slug: string; title: string }) => ({
              slug: item.slug,
              title: item.title,
            }));
          if (scrapable.length > 0) {
            setCategories(scrapable);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <header className="border-t-4 border-accent bg-paper pt-3 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Top Utilities Bar */}
          <div className="animate-fade-down flex items-center justify-between border-b border-rule pb-2 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase sm:text-[11px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>ঢাকা, বাংলাদেশ</span>
              <span className="hidden sm:inline text-rule">|</span>
              <span className="hidden sm:inline">লাইভ আপডেট</span>
            </div>

            <div className="hidden sm:block">
              <TodayDate />
            </div>

            <div className="flex items-center gap-2.5">
              {/* Search Trigger */}
              <button
                id="search-btn"
                type="button"
                onClick={() => setSearchOpen(true)}
                title="সংবাদ খুঁজুন (Ctrl+K)"
                aria-label="অনুসন্ধান"
                className="flex items-center gap-1.5 rounded-full border border-rule/80 px-2.5 py-1 text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3.5 w-3.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="hidden md:inline text-[10px] font-bold">অনুসন্ধান</span>
              </button>

              {/* Bookmarks Trigger */}
              <button
                id="bookmarks-btn"
                type="button"
                onClick={() => setBookmarksOpen(true)}
                title="সংরক্ষিত সংবাদ"
                aria-label="সংরক্ষিত সংবাদ"
                className="relative flex items-center gap-1 rounded-full border border-rule/80 px-2.5 py-1 text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={bookmarks.length > 0 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`h-3.5 w-3.5 ${bookmarks.length > 0 ? "text-accent fill-accent" : ""}`}
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                {bookmarks.length > 0 && (
                  <span className="rounded-full bg-accent px-1.5 py-0.2 text-[9px] font-black text-paper">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              {/* Dark/Light Mode Switcher */}
              <ThemeToggle />
            </div>
          </div>

          {/* Main Masthead Banner */}
          <div className="animate-fade-up grid grid-cols-[auto_1fr_auto] items-center gap-2 py-4 sm:gap-5 sm:py-6">
            {/* Logo */}
            <div className="justify-self-start">
              <Link href="/" className="group block">
                <Image
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-rule/80 transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
                  height={64}
                  width={64}
                  src="/logo.webp"
                  alt="বাংলা নিউজ ২৪ লোগো"
                  priority
                />
              </Link>
            </div>

            {/* Title / Slogan */}
            <div className="text-center px-1">
              <p className="mb-0.5 text-[8px] font-bold tracking-[0.3em] text-accent uppercase sm:mb-1 sm:text-[10px]">
                Bangla News 24 • Online Edition
              </p>
              <Link href="/" className="inline-block group">
                <h1 className="text-[1.75rem] leading-none font-black tracking-tight transition-colors group-hover:text-accent sm:text-5xl lg:text-6xl">
                  বাংলা নিউজ <span className="text-accent">২৪</span>
                </h1>
              </Link>
              <p className="mt-1 text-[10px] tracking-wide text-muted sm:mt-2 sm:text-sm">
                সত্যের সন্ধানে • নির্ভরযোগ্য সংবাদের বিশ্বস্ত ঠিকানা
              </p>
            </div>

            {/* Auth / Action Area */}
            <div className="flex items-center gap-2 justify-self-end">
              {/* Desktop Auth Section */}
              <div className="hidden sm:flex sm:items-center sm:gap-2">
                {user ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 rounded-full border border-rule/80 bg-paper-deep/40 py-1 pl-1.5 pr-3 text-xs font-bold text-ink transition-all hover:border-accent hover:shadow-sm"
                    >
                      <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-accent">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={28}
                          height={28}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="max-w-[100px] truncate">{user.name}</span>
                      <svg
                        className={`h-3.5 w-3.5 text-muted transition-transform ${
                          userDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setUserDropdownOpen(false)}
                        />
                        <div className="animate-scale-up absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-rule/80 bg-paper p-1 shadow-2xl">
                          <div className="border-b border-rule/60 p-3">
                            <p className="text-xs font-bold text-ink">{user.name}</p>
                            <p className="truncate text-[10px] text-muted">{user.email}</p>
                            <span className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[9px] font-bold text-accent">
                              {user.role}
                            </span>
                          </div>

                          <div className="py-1">
                            <Link
                              href="/auth"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-paper-deep/60"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>আমার প্রোফাইল</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                setBookmarksOpen(true);
                              }}
                              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-paper-deep/60"
                            >
                              <span className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.01l-7.234 4.557A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1Z" />
                                </svg>
                                <span>সংরক্ষিত সংবাদ</span>
                              </span>
                              <span className="rounded-full bg-accent/10 px-1.5 py-0.2 text-[10px] font-bold text-accent">
                                {bookmarks.length}
                              </span>
                            </button>
                          </div>

                          <div className="border-t border-rule/60 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                signOut();
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-accent hover:bg-accent/10"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span>সাইন আউট</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth"
                      className="border border-ink/80 px-4 py-1.5 text-xs font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                    >
                      সাইন ইন
                    </Link>
                    <Link
                      href="/auth"
                      className="border border-accent bg-accent px-4 py-1.5 text-xs font-semibold text-paper transition-colors duration-200 hover:border-accent-deep hover:bg-accent-deep hover:shadow-md"
                    >
                      সাইন আপ
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Hamburger Drawer Trigger */}
              <button
                id="mobile-drawer-btn"
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="মেনু খুলুন"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-rule/80 text-ink hover:border-accent hover:text-accent sm:hidden"
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
              </button>
            </div>
          </div>

          <div className="animate-rule double-rule" />
        </div>
      </header>

      {/* Global Interactive Modals and Mobile Bottom Nav */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <BookmarksModal isOpen={bookmarksOpen} onClose={() => setBookmarksOpen(false)} />
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />
      <MobileBottomNav
        onOpenDrawer={() => setDrawerOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />
    </>
  );
};

export default HeaderPage;
