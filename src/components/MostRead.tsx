interface MostReadProps {
    id: string,
    title: string,
}

const MostRead = async() => {
    const response = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const data = await response.json();
    const news: MostReadProps[] = data.data;

    return (
        <div className=' card mt-8 ml-6 pt-0'>
            <h1 className=" font-bold  text-xl py-3">সর্বাধিক পঠিত</h1>
            <div className='grid gap-4'>
                {
                    news.map((singlenews, index) => (
                        <div 
                        className="flex gap-3"
                        key={singlenews.id}>
                           <p className='text-[#c00107] font-bold text-xl'>{index + 1}</p> <h2 className="text-lg">{singlenews.title}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MostRead;