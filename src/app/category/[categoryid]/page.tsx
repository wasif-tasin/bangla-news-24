import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";
import { toBengaliNumber } from "@/lib/bengali";

interface ICategoryNews {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const CategoryNews = async ({ params }: PageProps<"/category/[categoryid]">) => {
  const { categoryid } = await params;

  const response = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryid}`);
  if (!response.ok) {
    throw new Error(`Failed to load category: ${response.status}`);
  }

  const data = await response.json();
  const categoryNews: ICategoryNews[] = data.data;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-10">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="ব্রেডক্রাম্ব"
        className="mb-5 flex items-center text-[11px] font-bold tracking-[0.14em] text-muted"
      >
        <Link href="/" className="transition-colors hover:text-accent">
          প্রথম পাতা
        </Link>
        <span className="mx-2 text-rule">/</span>
        <span className="text-accent">{data.title}</span>
      </nav>

      {/* Header Banner */}
      <header className="animate-fade-up mb-8 rounded-2xl border border-rule/80 bg-paper p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-bold tracking-[0.22em] text-accent uppercase">
              সংবাদ বিভাগ
            </p>
            <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {data.title}
            </h1>
          </div>
          <span className="rounded-full bg-paper-deep px-3.5 py-1 text-xs font-bold text-ink-soft">
            {toBengaliNumber(categoryNews.length)} টি সংবাদ প্রকাশিত
          </span>
        </div>
      </header>

      {/* News Grid */}
      {categoryNews.length === 0 ? (
        <div className="rounded-2xl border border-rule/80 bg-paper p-12 text-center shadow-sm">
          <p className="text-sm font-semibold text-muted">
            এই বিভাগে এখনো কোনো সংবাদ প্রকাশিত হয়নি।
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-accent px-5 py-2 text-xs font-bold text-paper transition-all hover:bg-accent-deep"
          >
            প্রথম পাতায় ফিরে যান
          </Link>
        </div>
      ) : (
        <Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {categoryNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default CategoryNews;
