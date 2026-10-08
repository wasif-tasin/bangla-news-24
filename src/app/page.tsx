import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";


export default async function Home() {
  const response = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await response.json();
  const section = data.data;
  const mainnews = section[0].articles;
  return (
    <div>
      <Marquee></Marquee>

      <div className=" container mx-auto grid grid-cols-3">
        {/* News section */}
        <div className="col-span-2">
          <MainNews news={mainnews}></MainNews>
        </div>
        {/* Most read section */}
        <div className="col-span-1">j</div>
      </div>
    </div>
  );
}
