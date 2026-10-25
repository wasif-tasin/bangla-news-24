"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollY > 280) {
        setShow(true);
      } else {
        setShow(false);
      }
      if (scrollHeight > 0) {
        setProgress(Math.min(100, Math.round((scrollY / scrollHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="উপরে যান"
      className={`fixed right-4 bottom-20 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-rule/80 bg-paper/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent sm:right-6 sm:bottom-8 ${
        show
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      {/* Circular Progress SVG */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 36 36">
        <path
          className="text-rule/40"
          strokeWidth="2.5"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-accent transition-all duration-100 ease-out"
          strokeDasharray={`${progress}, 100`}
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      {/* Arrow Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-4 w-4 text-ink-soft transition-transform group-hover:-translate-y-0.5"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
