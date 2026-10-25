"use client";

import { useState } from "react";
import ArticleActions from "./ArticleActions";

interface ArticleContentProps {
  article: {
    id: string;
    title: string;
    category?: string;
    imageUrl?: string;
  };
  text: string;
}

export default function ArticleContent({ article, text }: ArticleContentProps) {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  const fontClass =
    fontSize === "sm"
      ? "!text-[0.98rem] !leading-[1.9]"
      : fontSize === "lg"
      ? "!text-[1.25rem] sm:!text-[1.35rem] !leading-[2.3]"
      : "!text-[1.08rem] sm:!text-[1.12rem] !leading-[2.1]";

  return (
    <div>
      <ArticleActions
        article={article}
        onFontSizeChange={(size) => setFontSize(size)}
      />
      <div className={`article-body mx-auto mt-6 transition-all duration-200 ${fontClass}`}>
        {text}
      </div>
    </div>
  );
}
