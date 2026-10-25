"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  slug: string;
  title: string;
}

interface NavLinksClientProps {
  items: NavItem[];
}

export default function NavLinksClient({ items }: NavLinksClientProps) {
  const pathname = usePathname();
  const links = [
    { href: "/", title: "হোম" },
    ...items.map((item) => ({
      href: `/category/${item.slug}`,
      title: item.title,
    })),
  ];

  return (
    <nav
      aria-label="প্রধান মেনু"
      className="border-b border-rule/80 bg-paper/95 shadow-xs backdrop-blur-md transition-colors duration-300"
    >
      <div className="container relative mx-auto flex items-center justify-start sm:justify-center overflow-x-auto px-4 py-2 text-sm font-semibold [scrollbar-width:none] sm:gap-1.5 sm:text-[0.95rem] [&::-webkit-scrollbar]:hidden">
        {links.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`nav-link shrink-0 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "is-active text-accent bg-paper-deep/50"
                  : "text-ink hover:text-accent hover:bg-paper-deep/30"
              }`}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
