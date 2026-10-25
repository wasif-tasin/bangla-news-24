"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookmarksModal({ isOpen, onClose }: BookmarksModalProps) {
  const { bookmarks, toggleBookmark, clearBookmarks } = useAuth();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="animate-scale-up relative w-full max-w-lg overflow-hidden rounded-2xl border border-rule/80 bg-paper shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rule/80 px-5 py-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-accent"
            >
              <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.01l-7.234 4.557A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1Z" />
            </svg>
            <h3 className="text-base font-black tracking-tight sm:text-lg">
              সংরক্ষিত সংবাদ ({bookmarks.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {bookmarks.length > 0 && (
              <button
                type="button"
                onClick={clearBookmarks}
                className="text-xs text-muted transition-colors hover:text-accent"
              >
                সব মুছুন
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-muted transition-colors hover:bg-paper-deep hover:text-ink"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-5">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-paper-deep text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-ink-soft">
                আপনার কোনো সংরক্ষিত সংবাদ নেই
              </p>
              <p className="mt-1 text-xs text-muted">
                যেকোনো খবরের বুকমার্ক আইকনে ক্লিক করে পরে পড়ার জন্য সংরক্ষণ করুন।
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-rule/60 bg-paper-deep/30 p-2.5 transition-colors hover:border-accent/40"
                >
                  <Link
                    href={`/news/${item.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 min-w-0 flex-1"
                  >
                    {item.imageUrl && (
                      <figure className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-paper-deep">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </figure>
                    )}
                    <div className="min-w-0 flex-1">
                      {item.category && (
                        <span className="text-[9px] font-bold text-accent">
                          {item.category}
                        </span>
                      )}
                      <h4 className="text-xs font-semibold leading-snug text-ink line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[9px] text-muted">{item.savedAt}</p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(item)}
                    title="সংরক্ষণ তালিকা থেকে মুছুন"
                    aria-label="মুছুন"
                    className="rounded p-1 text-muted hover:bg-paper-deep hover:text-accent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
