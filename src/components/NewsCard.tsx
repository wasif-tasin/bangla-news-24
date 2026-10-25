import Image from "next/image";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

interface News {
  id: string;
  description: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: News }) => {
  return (
    <article className="news-card-hover group relative flex h-full flex-col rounded-xl border border-rule/60 bg-paper p-3 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md">
      {/* Thumbnail */}
      <Link href={`/news/${news.id}`} className="block">
        <figure className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-lg bg-paper-deep">
          <Image
            height={400}
            width={600}
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </figure>
      </Link>

      {/* Meta Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-block rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-accent uppercase">
          {news.category}
        </span>
        <BookmarkButton
          article={{
            id: news.id,
            title: news.title,
            category: news.category,
            imageUrl: news.imageUrl,
          }}
        />
      </div>

      {/* Headline */}
      <Link href={`/news/${news.id}`} className="block flex-1">
        <h3 className="headline-link text-base font-bold leading-snug text-ink sm:text-[1.05rem]">
          {news.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
          {news.description}
        </p>
      </Link>

      {/* Card Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-rule/50 pt-2 text-[10px] font-semibold text-muted">
        <span>৩ মিনিট পড়ুন</span>
        <Link
          href={`/news/${news.id}`}
          className="text-accent transition-transform group-hover:translate-x-1"
        >
          বিস্তারিত →
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
