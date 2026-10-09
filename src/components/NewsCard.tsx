import Image from "next/image";
import Link from "next/link";

interface News {
    id: string,
    description: string,
    title: string,
    category: string,
    imageUrl: string,
    imageAlt: string
}


const NewsCard = ({ news }: { news: News }) => {
    return (
    <Link href={`/news/${news.id}`}>
            <div className="card w-full px-0 py-0">
            <figure className="w-full">
                <Image
                    height={400}
                    width={400}
                    src={news.imageUrl}
                    alt={news.imageAlt}
                    className='h-auto w-full object-cover p-0'>
                </Image>
            </figure>
            <div className="card-body">
                <p className='text-[#c00107] text-sm'>{news.category}</p>
                <h2 className="card-title font-bold text-lg">{news.title}</h2>
                <p className="line-clamp-2 text-sm text-gray-500">{news.description}</p>
            </div>
        </div>
    </Link>
    );
};

export default NewsCard;