import NavLinksClient from "./NavLinksClient";

export interface INav {
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

    return <NavLinksClient items={filterNav.map(({ slug, title }) => ({ slug, title }))} />;
};

export default NavLinks;
