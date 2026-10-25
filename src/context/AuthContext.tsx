"use client";

import React, { createContext, useContext, useState } from "react";

export interface BookmarkedArticle {
  id: string;
  title: string;
  category?: string;
  imageUrl?: string;
  savedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  bookmarks: BookmarkedArticle[];
  signIn: (email: string, name?: string) => Promise<boolean>;
  signUp: (name: string, email: string) => Promise<boolean>;
  signOut: () => void;
  toggleBookmark: (article: { id: string; title: string; category?: string; imageUrl?: string }) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem("bangla_news_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function getInitialBookmarks(): BookmarkedArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("bangla_news_bookmarks");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>(getInitialBookmarks);

  const signIn = async (email: string, name?: string): Promise<boolean> => {
    const userName = name || email.split("@")[0] || "নিয়মিত পাঠক";
    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: userName,
      email: email,
      avatar: `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(userName)}`,
      role: "প্রিমিয়াম পাঠক",
      joinedDate: new Intl.DateTimeFormat("bn-BD", { month: "long", year: "numeric" }).format(new Date()),
    };

    setUser(newUser);
    try {
      localStorage.setItem("bangla_news_user", JSON.stringify(newUser));
    } catch {
      // Ignore
    }
    return true;
  };

  const signUp = async (name: string, email: string): Promise<boolean> => {
    return signIn(email, name);
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem("bangla_news_user");
    } catch {
      // Ignore
    }
  };

  const toggleBookmark = (article: { id: string; title: string; category?: string; imageUrl?: string }) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === article.id);
      let updated: BookmarkedArticle[];
      if (exists) {
        updated = prev.filter((b) => b.id !== article.id);
      } else {
        const item: BookmarkedArticle = {
          id: article.id,
          title: article.title,
          category: article.category,
          imageUrl: article.imageUrl,
          savedAt: new Intl.DateTimeFormat("bn-BD", { dateStyle: "medium" }).format(new Date()),
        };
        updated = [item, ...prev];
      }
      try {
        localStorage.setItem("bangla_news_bookmarks", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const isBookmarked = (id: string): boolean => {
    return bookmarks.some((b) => b.id === id);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    try {
      localStorage.removeItem("bangla_news_bookmarks");
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookmarks,
        signIn,
        signUp,
        signOut,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
