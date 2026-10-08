import Image from "next/image";

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
        <div className="card w-83 px-0 py-0">
            <figure>
                <Image
                    height={400}
                    width={400}
                    src={news.imageUrl}
                    alt={news.imageAlt}
                    className='h-full w-full p-0'>
                </Image>
            </figure>
            <div className="card-body">
                <p className='text-[#c00107] text-sm'>{news.category}</p>
                <h2 className="card-title font-bold text-lg">{news.title}</h2>
                <p className="line-clamp-2 text-sm text-gray-500">{news.description}</p>
            </div>
        </div>
    );
};

export default NewsCard;