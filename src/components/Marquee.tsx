import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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
        <div className="bg-[#c00107]">
            <div className=" container mx-auto text-white  text-lg flex">
                <div className="bg-red-800 text-white py-1.5 px-3 font-bold">
                    সর্বশেষ
                </div>
                <MarqueeText className="py-1.5" direction="right" duration={15}>
                    {headLines.map((headLine) => (
                        <span key={headLine.id}>
                            <span>{headLine.title}</span>
                            <span className="mx-5">✦</span>
                        </span>
                    ))}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;
