import Image from "next/image";



const NewsDetails = async({params} : {params: {newsid: string}}) => {
    const {newsid} = await params;


    const response = await fetch(`https://news-api-v2.vercel.app/api/article/${newsid}`);
    const data = await response.json();
    const newsDetails = data.data;
    console.log(newsDetails);

    return (
        <div className='container mx-auto mt-8'>
            <h1 className="text-3xl font-bold text-center items-center">{newsDetails.title}</h1>
            <Image src={newsDetails.imageUrl} alt={newsDetails.title} width={800} height={400} className="mx-auto my-4 rounded-lg h-auto w-cover" />
            <p>{newsDetails.text}</p>
        </div>
    );
};

export default NewsDetails;