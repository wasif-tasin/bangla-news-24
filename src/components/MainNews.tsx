import Image from 'next/image';

interface News {
    id: string,
    description: string,
    title: string,
    category: string,
    imageUrl: string,
    imageAlt: string
}

const MainNews = ({ news }: { news: News[] }) => {
    const [firstnews, ...othernews] = news;
    // const othernews = news.slice(1);
    return (
        <div className='flex mt-8 mb-8'>
            <div className="card w-145 px-0 py-0 ">
                <figure>
                    <Image
                        height={400}
                        width={400}
                        src={firstnews.imageUrl}
                        alt={firstnews.imageAlt}
                        className='w-full p-0'>
                    </Image>
                </figure>
                <div className="card-body">
                    <p className='text-[#c00107] text-lg'>{firstnews.category}</p>
                    <h2 className="card-title font-bold text-2xl">{firstnews.title}</h2>
                    <p>{firstnews.description}</p>
                </div>
            </div>
            <div className=' ml-6 card w-100 p-0  border-gray-300 rounded-xl'>
                {
                    othernews.slice(0, 4).map(singlenews =>
                        <div className='border-b border-gray-300 last:border-b-0' key={singlenews.id}>
                            <p className='text-[#c00107] pl-2 pt-2'>{firstnews.category}</p>
                            <div className='pl-2 text-xl pb-6'>
                                {singlenews.title}
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MainNews;