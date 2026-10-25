"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface BookmarkButtonProps {
  article: {
    id: string;
    title: string;
    category?: string;
    imageUrl?: string;
  };
  className?: string;
  showText?: boolean;
}

export default function BookmarkButton({
  article,
  className = "",
  showText = false,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useAuth();
  const [bouncing, setBouncing] = useState(false);
  const bookmarked = isBookmarked(article.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBouncing(true);
    toggleBookmark(article);
    setTimeout(() => setBouncing(false), 400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={bookmarked ? "সংরক্ষিত তালিকা থেকে সরান" : "সংরক্ষণ করুন"}
      title={bookmarked ? "সংরক্ষিত" : "সংরক্ষণ করুন"}
      className={`group relative flex items-center gap-1.5 transition-all duration-200 ${className} ${
        bouncing ? "scale-125" : "hover:scale-110 active:scale-95"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 transition-colors ${
          bookmarked ? "text-accent fill-accent" : "text-muted group-hover:text-accent"
        }`}
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
      {showText && (
        <span className={`text-xs font-semibold ${bookmarked ? "text-accent" : "text-muted"}`}>
          {bookmarked ? "সংরক্ষিত" : "সংরক্ষণ"}
        </span>
      )}
    </button>
  );
}
