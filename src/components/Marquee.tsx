import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

export interface ITrendingMarqueeNews {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

const Marquee = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10",
  );
  const data = await response.json();
  const headLines: ITrendingMarqueeNews[] = data.data;

  return (
    <section
      aria-label="সর্বশেষ সংবাদ"
      className="border-b border-rule bg-paper-deep/50 transition-colors duration-300"
    >
      <div className="container mx-auto flex items-stretch px-4">
        {/* Badge */}
        <div className="flex shrink-0 items-center gap-2 border-r border-rule/80 bg-accent px-3 py-2 text-[11px] font-bold tracking-[0.12em] text-paper shadow-sm sm:px-4 sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
          </span>
          সর্বশেষ
        </div>

        {/* Marquee Ticker */}
        <MarqueeText
          className="min-w-0 flex-1 py-2 text-xs sm:text-sm font-medium"
          direction="right"
          duration={28}
          pauseOnHover
        >
          {headLines.map((headLine) => (
            <span key={headLine.id} className="inline-flex items-center">
              <Link
                href={`/news/${headLine.id}`}
                className="transition-colors hover:text-accent hover:underline"
              >
                {headLine.title}
              </Link>
              <span className="mx-4 text-accent opacity-75">✦</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </section>
  );
};

export default Marquee;
