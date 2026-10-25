import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";

interface Article {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  imageAlt?: string;
  category?: string;
  source?: string;
  firstPublished?: string;
  lastPublished?: string;
}

function formatPublished(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

const NewsDetails = async ({ params }: PageProps<"/news/[newsid]">) => {
  const { newsid } = await params;

  const response = await fetch(`https://news-api-v2.vercel.app/api/article/${newsid}`);
  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  const article: Article = data.data;

  if (!article) {
    notFound();
  }

  const published = formatPublished(article.lastPublished ?? article.firstPublished);

  return (
    <article className="container mx-auto max-w-4xl px-4 py-8 lg:py-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="ব্রেডক্রাম্ব"
        className="mb-6 flex items-center text-[11px] font-bold tracking-[0.14em] text-muted"
      >
        <Link href="/" className="transition-colors hover:text-accent">
          প্রথম পাতা
        </Link>
        <span className="mx-2 text-rule">/</span>
        <span className="text-accent">{article.category ?? "সংবাদ"}</span>
      </nav>

      {/* Article Header */}
      <header className="animate-fade-up">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-accent uppercase">
            <span className="h-px w-6 bg-accent" />
            {article.category ?? "সংবাদ"}
          </p>
          <span className="rounded-full bg-paper-deep px-3 py-1 text-[11px] font-semibold text-muted">
            বাংলা নিউজ ২৪ বিশেষ
          </span>
        </div>

        <h1 className="text-2xl font-black leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          {article.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-y-2 border-y border-rule py-3 text-xs font-semibold text-muted">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {published && (
              <time
                dateTime={article.lastPublished ?? article.firstPublished}
                className="flex items-center gap-1.5"
              >
                <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                </svg>
                {published}
              </time>
            )}
            {article.source && <span>সূত্র: {article.source}</span>}
          </div>
          <span className="font-bold text-accent">বাংলা নিউজ ২৪ অনলাইন ডেস্ক</span>
        </div>
      </header>

      {/* Lead Image */}
      <figure className="animate-fade-in relative mt-6 overflow-hidden rounded-2xl bg-paper-deep shadow-md">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt || article.title}
          width={1200}
          height={675}
          loading="eager"
          fetchPriority="high"
          className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
        />
        {article.imageAlt && (
          <figcaption className="border-t border-rule/50 bg-paper-deep/60 px-4 py-2 text-right text-[11px] text-muted italic">
            ছবি: {article.imageAlt}
          </figcaption>
        )}
      </figure>

      {/* Article Body & Interactive Controls */}
      <ArticleContent
        article={{
          id: article.id,
          title: article.title,
          category: article.category,
          imageUrl: article.imageUrl,
        }}
        text={article.text}
      />

      {/* Bottom Footer Action */}
      <div className="mt-12 border-t-4 border-double border-ink pt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-ink bg-transparent px-6 py-2.5 text-xs font-bold tracking-[0.14em] text-ink transition-all duration-300 hover:bg-ink hover:text-paper hover:shadow-lg"
        >
          ← প্রথম পাতায় ফিরে যান
        </Link>
      </div>
    </article>
  );
};

export default NewsDetails;
