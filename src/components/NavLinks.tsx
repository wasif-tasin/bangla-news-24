import Link from "next/link";

interface INav {
    slug: string,
    title: string,
    topicId: string | null,
    url: string,
    scrapable: boolean
}

const NavLinks = async () => {
    const response = await fetch("https://news-api-v2.vercel.app/api/categories")
    const data = await response.json();
    const nav: INav[] = data.data;
    const filterNav = nav.filter(items => items.scrapable)
    return (
        <div className=" flex gap-5 justify-center mt-3">
            <Link href={'/'}>হোম</Link>
            {filterNav.map((items, index) => <Link key={index} href={items.slug}>{items.title}</Link>)}
        </div>
    );
};

export default NavLinks;