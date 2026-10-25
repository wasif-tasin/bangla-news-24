import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";
import Link from "next/link";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    description: string;
    title: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

const trendingTopics = [
  { name: "#জাতীয়_রাজনীতি", href: "/category/politics" },
  { name: "#আন্তর্জাতিক_সংবাদ", href: "/category/world" },
  { name: "#খেলাধুলা", href: "/category/sports" },
  { name: "#তথ্যপ্রযুক্তি", href: "/category/technology" },
  { name: "#অর্থনীতি_ব্যবসা", href: "/category/economy" },
  { name: "#স্বাস্থ্যসেবা", href: "/category/health" },
];

export default async function Home() {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
  );
  const data = await response.json();
  const section = data.data;
  const mainnews = section[0].articles;
  const othersection: IOtherSection[] = section.slice(1);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
      {/* Trending Topics Tag Strip */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 rounded-md bg-accent/10 px-2 py-1 text-[11px] font-black text-accent uppercase">
          হট টপিক
        </span>
        {trendingTopics.map((topic) => (
          <Link
            key={topic.name}
            href={topic.href}
            className="shrink-0 rounded-full border border-rule/70 bg-paper px-3 py-1 text-ink-soft transition-all duration-200 hover:border-accent hover:bg-paper-deep/60 hover:text-accent"
          >
            {topic.name}
          </Link>
        ))}
      </div>

      {/* Page Title & Date Banner */}
      <div className="animate-fade-up mb-7 flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-2.5">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">প্রথম পাতা</h1>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent">
            আজকের নির্বাচিত সংবাদ
          </span>
        </div>
        <p className="text-[10px] font-bold tracking-[0.18em] text-muted uppercase sm:text-[11px]">
          সর্বশেষ সংস্করণ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="lg:col-span-2">
          <Reveal>
            <MainNews news={mainnews} />
          </Reveal>

          {othersection.map((othernews, index) => (
            <Reveal
              key={othernews.curationId}
              delay={Math.min(index * 80, 240)}
            >
              <section className="mt-10 sm:mt-12">
                <div className="mb-5 flex items-center gap-3 border-b-2 border-ink pb-2.5">
                  <span className="h-4 w-1 bg-accent rounded-full" />
                  <h2 className="text-xl font-black sm:text-2xl">{othernews.title}</h2>
                  <span className="ml-auto text-[10px] font-bold tracking-[0.16em] text-accent uppercase">
                    বিশেষ প্রতিবেদন
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {othernews.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <aside className="lg:col-span-1">
          <Reveal delay={120} className="lg:sticky lg:top-16">
            <MostRead />
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
