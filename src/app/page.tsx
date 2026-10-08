import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

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

export default async function Home() {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
  );
  const data = await response.json();
  const section = data.data;
  const mainnews = section[0].articles;
  const othersection: IOtherSection[] = section.slice(1);

  return (
    <div>
      <div className=" container mx-auto grid grid-cols-3">
        {/* News section */}
        <div className="col-span-2">
          <MainNews news={mainnews}></MainNews>
          {othersection.map((othernews) => (
            <div
              key={othernews.curationId}
              className=" font-bold text-xl"
            >
              <h1 className=" border-b-2 border-[#c00107]  py-3">{othernews.title}</h1>
              <div className="grid grid-cols-3 gap-4 pt-3">
                {othernews.articles.map((news) => (
                  <NewsCard key={news.id} news={news}></NewsCard>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Most read section */}
        <div className="col-span-1">
          <MostRead></MostRead>
        </div>
      </div>
    </div>
  );
}
