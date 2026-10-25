import Link from "next/link";
import { toBengaliNumber } from "@/lib/bengali";
import BookmarkButton from "./BookmarkButton";

interface MostReadProps {
  id: string;
  title: string;
}

const MostRead = async () => {
  const response = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await response.json();
  const news: MostReadProps[] = data.data;

  return (
    <section
      aria-labelledby="most-read-heading"
      className="rounded-2xl border border-rule/80 bg-paper p-5 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between border-b-2 border-accent pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M12 2c.5 1.5 1.5 2.5 3 3.5 1.5 1 2.5 2.5 2.5 4.5a6 6 0 1 1-12 0c0-2 1-3.5 2.5-4.5 1.5-1 2.5-2 3-3.5z" />
            </svg>
          </span>
          <h2 id="most-read-heading" className="text-xl font-black text-ink">
            সর্বাধিক পঠিত
          </h2>
        </div>
        <span className="rounded-full bg-paper-deep px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-muted uppercase">
          Trending
        </span>
      </div>

      <ol className="divide-y divide-rule/60">
        {news.map((singlenews, index) => {
          const isTopThree = index < 3;
          const rankColors = [
            "text-amber-500 bg-amber-500/10 border-amber-500/30",
            "text-slate-400 bg-slate-400/10 border-slate-400/30",
            "text-amber-700 bg-amber-700/10 border-amber-700/30",
          ];
          const rankStyle = isTopThree
            ? rankColors[index]
            : "text-muted bg-paper-deep/60 border-rule/50";

          return (
            <li key={singlenews.id} className="group py-3.5 transition-colors">
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sm font-black transition-transform duration-300 group-hover:scale-110 ${rankStyle}`}
                >
                  {toBengaliNumber(index + 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/news/${singlenews.id}`}
                      className="headline-link text-[0.92rem] font-bold leading-snug text-ink sm:text-[0.95rem]"
                    >
                      {singlenews.title}
                    </Link>
                    <BookmarkButton
                      article={{
                        id: singlenews.id,
                        title: singlenews.title,
                      }}
                      className="mt-0.5"
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default MostRead;
