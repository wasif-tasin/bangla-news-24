"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent shadow-[0_0_8px_var(--bnews-accent)] transition-all duration-150 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
