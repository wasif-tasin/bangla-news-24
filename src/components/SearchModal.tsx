"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  id: string;
  title: string;
  category?: string;
  imageUrl?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [allNews, setAllNews] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || allNews.length > 0) return;

    let isMounted = true;
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=25");
        const data = await res.json();
        if (isMounted && data?.data) {
          setAllNews(data.data);
        }
      } catch {
        // Ignore
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [isOpen, allNews.length]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return allNews.slice(0, 6);
    }
    const q = query.toLowerCase().trim();
    const categoryMap: Record<string, string> = {
      politics: "রাজনীতি",
      political: "রাজনীতি",
      world: "বিশ্ব",
      international: "আন্তর্জাতিক",
      sports: "খেলা",
      sport: "খেলাধুলা",
      tech: "প্রযুক্তি",
      technology: "তথ্যপ্রযুক্তি",
      economy: "অর্থনীতি",
      business: "বাণিজ্য",
      health: "স্বাস্থ্য",
    };
    const translated = categoryMap[q] || "";

    return allNews.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        (translated && (item.title?.includes(translated) || item.category?.includes(translated)))
    );
  }, [query, allNews]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="animate-scale-up relative w-full max-w-xl overflow-hidden rounded-2xl border border-rule/80 bg-paper shadow-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-rule/80 px-4 py-3.5 sm:px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-accent"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সংবাদ অনুসন্ধান করুন (যেমন: রাজনীতি, খেলা, প্রযুক্তি)..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:text-base"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-rule/60 px-2 py-0.5 text-xs font-semibold text-muted hover:border-ink hover:text-ink"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {loading ? (
            <div className="py-10 text-center text-sm text-muted">সংবাদ লোড হচ্ছে...</div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted">
              &ldquo;{query}&rdquo; এর সাথে কোনো সংবাদ পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[10px] font-bold tracking-[0.16em] text-muted uppercase">
                {query ? "অনুসন্ধানের ফলাফল" : "সাম্প্রতিক শিরোনাম"}
              </p>
              <div className="divide-y divide-rule/60">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    onClick={onClose}
                    className="group flex items-start gap-3 py-2.5 transition-colors hover:bg-paper-deep/50 rounded-lg px-2 -mx-2"
                  >
                    {item.imageUrl && (
                      <figure className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-paper-deep">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </figure>
                    )}
                    <div className="min-w-0 flex-1">
                      {item.category && (
                        <span className="text-[9px] font-bold text-accent">
                          {item.category}
                        </span>
                      )}
                      <h4 className="headline-link text-xs font-semibold leading-snug sm:text-sm line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
