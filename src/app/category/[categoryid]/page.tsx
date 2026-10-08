import NewsCard from '@/components/NewsCard';
interface ICategoryNews {
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    imageAlt: string,
    params: {
        categoryid: string
    }

}

const CategoryNews = async ({ params }: { params: { categoryid: string } }) => {
    const { categoryid } = await params;

    const response = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryid}`);
    const data = await response.json();
    const categoryNews: ICategoryNews[] = data.data;

    return (
        <div className='container mx-auto'>
            <div className="border-b-2 border-[#c00107] py-3">
                <h1 className="text-2xl font-bold">{data.title}</h1>
            </div>
            <div className='grid grid-cols-3 gap-4 mt-3'>
                {
                    categoryNews.map(news => <NewsCard key={news.id} news={news}></NewsCard>)
                }
            </div>
        </div>
    );
};

export default CategoryNews;