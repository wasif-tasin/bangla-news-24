import Image from "next/image";
import Link from "next/link";
import { toBengaliNumber } from "@/lib/bengali";
import BookmarkButton from "./BookmarkButton";

interface News {
  id: string;
  description: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const MainNews = ({ news }: { news: News[] }) => {
  if (!news || news.length === 0) return null;
  const [firstnews, ...othernews] = news;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-rule/70 bg-paper p-4 shadow-sm transition-all duration-300 hover:shadow-md lg:flex-row lg:gap-8 lg:p-6">
      {/* Lead Article */}
      <article className="group lg:w-3/5">
        <div className="relative">
          <Link href={`/news/${firstnews.id}`} className="block">
            <figure className="relative aspect-[16/10] overflow-hidden rounded-xl bg-paper-deep">
              <Image
                height={520}
                width={800}
                src={firstnews.imageUrl}
                alt={firstnews.imageAlt || firstnews.title}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </figure>
          </Link>

          {/* Lead badge & bookmark overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="rounded-md bg-accent px-2.5 py-1 text-[10px] font-black tracking-wider text-paper uppercase shadow-md pointer-events-auto">
              প্রধান খবর
            </span>
            <div className="rounded-full bg-paper/85 p-1.5 backdrop-blur-md shadow-md pointer-events-auto">
              <BookmarkButton
                article={{
                  id: firstnews.id,
                  title: firstnews.title,
                  category: firstnews.category,
                  imageUrl: firstnews.imageUrl,
                }}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-accent uppercase">
            <span className="h-px w-5 bg-accent" />
            {firstnews.category}
          </p>
          <Link href={`/news/${firstnews.id}`}>
            <h2 className="headline-link text-2xl font-black leading-snug sm:text-3xl lg:text-[2rem]">
              {firstnews.title}
            </h2>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.98rem]">
            {firstnews.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <polyline points="12 6 12 12 16 14" strokeWidth="2" />
              </svg>
              ৪ মিনিট পড়ার সময়
            </span>
            <Link
              href={`/news/${firstnews.id}`}
              className="font-bold text-accent hover:underline ml-auto"
            >
              পুরো সংবাদটি পড়ুন →
            </Link>
          </div>
        </div>
      </article>

      {/* Side Featured Stories */}
      <div className="flex flex-col border-t border-rule lg:w-2/5 lg:border-t-0 lg:border-l lg:border-rule lg:pl-8">
        <div className="mb-2 flex items-center justify-between border-b border-rule py-2">
          <p className="text-[11px] font-black tracking-[0.16em] text-ink uppercase">
            আরও গুরুত্বপূর্ণ সংবাদ
          </p>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
        </div>

        <div className="divide-y divide-rule/70">
          {othernews.slice(0, 4).map((singlenews, index) => (
            <div
              key={singlenews.id}
              className="group flex items-start gap-3.5 py-3.5 transition-colors"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-deep text-xs font-black text-accent shadow-inner">
                {toBengaliNumber(String(index + 1).padStart(2, "0"))}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-muted uppercase">
                    {singlenews.category}
                  </span>
                  <BookmarkButton
                    article={{
                      id: singlenews.id,
                      title: singlenews.title,
                      category: singlenews.category,
                      imageUrl: singlenews.imageUrl,
                    }}
                  />
                </div>
                <Link href={`/news/${singlenews.id}`}>
                  <h3 className="headline-link mt-1 text-sm font-bold leading-snug sm:text-base">
                    {singlenews.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
