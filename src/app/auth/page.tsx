"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter();
  const { user, signIn, signUp, signOut, bookmarks } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage({ type: "error", text: "অনুগ্রহ করে আপনার ইমেইল প্রদান করুন।" });
      return;
    }

    if (mode === "signup" && !name) {
      setMessage({ type: "error", text: "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।" });
      return;
    }

    if (!password || password.length < 6) {
      setMessage({ type: "error", text: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।" });
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email);
        setMessage({ type: "success", text: "সফলভাবে লগইন হয়েছে! আপনাকে স্বাগতম।" });
      } else {
        await signUp(name, email);
        setMessage({ type: "success", text: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! স্বাগতম।" });
      }
      setTimeout(() => {
        router.push("/");
      }, 900);
    } catch {
      setMessage({ type: "error", text: "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।" });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await signIn("tanvir.ahmed@example.com", "তানভীর আহমেদ");
    setMessage({ type: "success", text: "ডেমো অ্যাকাউন্টে প্রবেশ করা হয়েছে!" });
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  // If already logged in, show user dashboard view
  if (user) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-12 sm:py-16">
        <div className="animate-scale-up rounded-2xl border border-rule/80 bg-paper p-6 shadow-xl sm:p-8">
          <div className="text-center">
            <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-accent bg-paper-deep p-1">
              <Image
                src={user.avatar}
                alt={user.name}
                width={96}
                height={96}
                className="h-full w-full rounded-full object-cover"
                unoptimized
              />
            </div>
            <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
              {user.role}
            </span>
            <h1 className="mt-2 text-2xl font-black text-ink">{user.name}</h1>
            <p className="text-xs text-muted">{user.email}</p>
            <p className="mt-1 text-[11px] text-muted">যোগদান: {user.joinedDate}</p>
          </div>

          <div className="my-6 border-t border-rule" />

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-rule/70 bg-paper-deep/40 p-4">
              <span className="text-2xl font-black text-accent">{bookmarks.length}</span>
              <p className="mt-1 text-xs font-semibold text-muted">সংরক্ষিত সংবাদ</p>
            </div>
            <div className="rounded-xl border border-rule/70 bg-paper-deep/40 p-4">
              <span className="text-2xl font-black text-ink">সক্রিয়</span>
              <p className="mt-1 text-xs font-semibold text-muted">অ্যাকাউন্ট স্ট্যাটাস</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-paper transition-all hover:bg-accent-deep"
            >
              হোমপেজে ফিরে যান
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex w-full items-center justify-center rounded-xl border border-rule px-4 py-2.5 text-xs font-bold text-ink-soft transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              সাইন আউট করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-10 sm:py-16">
      <div className="animate-scale-up rounded-2xl border border-rule/80 bg-paper p-6 shadow-2xl sm:p-8">
        {/* Brand / Logo header */}
        <div className="mb-6 text-center">
          <Link href="/" className="inline-block text-2xl font-black tracking-tight sm:text-3xl">
            বাংলা নিউজ <span className="text-accent">২৪</span>
          </Link>
          <p className="mt-1 text-xs text-muted">
            {mode === "signin"
              ? "আপনার অ্যাকাউন্টে সাইন ইন করুন"
              : "নতুন অ্যাকাউন্ট তৈরি করে যুক্ত হোন"}
          </p>
        </div>

        {/* Tab switch */}
        <div className="mb-6 grid grid-cols-2 rounded-xl border border-rule/80 bg-paper-deep/50 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMessage(null);
            }}
            className={`rounded-lg py-2 transition-all duration-200 ${
              mode === "signin"
                ? "bg-paper text-accent shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            সাইন ইন
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setMessage(null);
            }}
            className={`rounded-lg py-2 transition-all duration-200 ${
              mode === "signup"
                ? "bg-paper text-accent shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            নিবন্ধন (সাইন আপ)
          </button>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div
            className={`mb-4 rounded-xl p-3 text-xs font-medium ${
              message.type === "success"
                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Quick Demo One-Click Sign In */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/5 px-4 py-2.5 text-xs font-bold text-accent transition-colors hover:bg-accent/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          ১-ক্লিকে ডেমো লগইন করুন
        </button>

        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-rule" />
          </div>
          <span className="relative bg-paper px-3 text-[10px] font-bold tracking-wider text-muted uppercase">
            অথবা ইমেইল দিয়ে
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-xs font-bold text-ink-soft">
                আপনার নাম
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                className="w-full rounded-xl border border-rule/80 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-bold text-ink-soft">
              ইমেইল ঠিকানা
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full rounded-xl border border-rule/80 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-bold text-ink-soft">পাসওয়ার্ড</label>
              {mode === "signin" && (
                <button
                  type="button"
                  onClick={() =>
                    setMessage({
                      type: "success",
                      text: "পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে (ডেমো)।",
                    })
                  }
                  className="text-[11px] text-accent hover:underline"
                >
                  ভুলে গেছেন?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-rule/80 bg-paper px-3.5 py-2.5 pr-10 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent py-2.5 text-xs font-bold text-paper transition-all duration-200 hover:bg-accent-deep hover:shadow-lg disabled:opacity-60"
          >
            {loading
              ? "প্রক্রিয়াকরণ হচ্ছে..."
              : mode === "signin"
              ? "সাইন ইন করুন"
              : "নিবন্ধন সম্পন্ন করুন"}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-muted">
          চালিয়ে যাওয়ার মাধ্যমে আপনি বাংলা নিউজ ২৪ এর{" "}
          <span className="text-accent hover:underline">শর্তাবলী</span> ও{" "}
          <span className="text-accent hover:underline">গোপনীয়তা নীতি</span> মেনে নিচ্ছেন।
        </p>
      </div>
    </div>
  );
}
