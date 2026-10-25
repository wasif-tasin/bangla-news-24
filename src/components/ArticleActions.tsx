"use client";

import { useState } from "react";
import BookmarkButton from "./BookmarkButton";

interface ArticleActionsProps {
  article: {
    id: string;
    title: string;
    category?: string;
    imageUrl?: string;
    textLength?: number;
  };
  onFontSizeChange?: (size: "sm" | "base" | "lg") => void;
}

export default function ArticleActions({
  article,
  onFontSizeChange,
}: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);
  const [activeSize, setActiveSize] = useState<"sm" | "base" | "lg">("base");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSize = (size: "sm" | "base" | "lg") => {
    setActiveSize(size);
    if (onFontSizeChange) {
      onFontSizeChange(size);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(article.title);

  return (
    <div className="my-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rule/70 bg-paper-deep/30 px-4 py-3">
      {/* Font Size & Reading Mode */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-muted">হরফের আকার:</span>
        <div className="flex items-center rounded-lg border border-rule/80 bg-paper p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleSize("sm")}
            className={`rounded px-2 py-0.5 transition-colors ${
              activeSize === "sm"
                ? "bg-accent text-paper"
                : "text-ink-soft hover:text-accent"
            }`}
            title="ছোট হরফ"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => handleSize("base")}
            className={`rounded px-2 py-0.5 transition-colors ${
              activeSize === "base"
                ? "bg-accent text-paper"
                : "text-ink-soft hover:text-accent"
            }`}
            title="স্বাভাবিক হরফ"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => handleSize("lg")}
            className={`rounded px-2 py-0.5 transition-colors ${
              activeSize === "lg"
                ? "bg-accent text-paper"
                : "text-ink-soft hover:text-accent"
            }`}
            title="বড় হরফ"
          >
            A+
          </button>
        </div>

        {/* Audio reader simulation button */}
        <button
          type="button"
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className={`ml-2 hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            isPlayingAudio
              ? "border-accent bg-accent text-paper"
              : "border-rule/80 text-ink-soft hover:border-accent hover:text-accent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <span>{isPlayingAudio ? "শুনছেন..." : "সংবাদ শুনুন"}</span>
        </button>
      </div>

      {/* Social Share & Bookmark Actions */}
      <div className="flex items-center gap-2">
        <BookmarkButton article={article} showText className="mr-2" />

        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          title="ফেসবুকে শেয়ার করুন"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-rule/80 text-muted transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        {/* WhatsApp Share */}
        <a
          href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          title="হোয়াটসঅ্যাপে শেয়ার করুন"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-rule/80 text-muted transition-colors hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
          </svg>
        </a>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          title="লিংক কপি করুন"
          className="relative flex h-8 items-center gap-1.5 rounded-full border border-rule/80 px-2.5 text-xs font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>{copied ? "কপি হয়েছে!" : "কপি"}</span>
        </button>
      </div>
    </div>
  );
}
