import Link from "next/link";
import { toBengaliNumber } from "@/lib/bengali";

const Footer = () => {
  return (
    <footer className="mt-16 border-t-4 border-double border-rule bg-paper-deep/50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 text-center sm:text-left md:grid-cols-4">
          {/* Masthead info */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block text-2xl font-black tracking-tight text-ink">
              বাংলা নিউজ <span className="text-accent">২৪</span>
            </Link>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted">
              সত্যের সন্ধানে নির্ভীক, নিরপেক্ষ ও নির্ভরযোগ্য সংবাদের ঠিকানা। সর্বশেষ দেশ-বিদেশের সংবাদ সবার আগে আপনার কাছে পৌঁছে দিতে আমরা প্রতিজ্ঞাবদ্ধ।
            </p>
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2.5">
              <span className="text-[11px] font-bold text-muted">সম্পাদক:</span>
              <span className="text-xs font-bold text-ink">তানভীর আহমেদ</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-xs font-black tracking-wider text-ink uppercase">
              গুরুত্বপূর্ণ বিভাগ
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-muted">
              <li>
                <Link href="/category/politics" className="transition-colors hover:text-accent">
                  রাজনীতি
                </Link>
              </li>
              <li>
                <Link href="/category/world" className="transition-colors hover:text-accent">
                  আন্তর্জাতিক
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="transition-colors hover:text-accent">
                  খেলাধুলা
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="transition-colors hover:text-accent">
                  তথ্যপ্রযুক্তি
                </Link>
              </li>
              <li>
                <Link href="/category/economy" className="transition-colors hover:text-accent">
                  অর্থ ও বাণিজ্য
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="mb-3 text-xs font-black tracking-wider text-ink uppercase">
              যোগাযোগ ও নীতিমালা
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-muted">
              <li>
                <Link href="/auth" className="transition-colors hover:text-accent">
                  পাঠক অ্যাকাউন্ট
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-accent">আমাদের সম্পর্কে</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-accent">বিজ্ঞাপন সংক্রান্ত</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-accent">গোপনীয়তা নীতি</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto my-8 h-px w-full bg-rule/70" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left text-xs text-muted">
          <p>© {toBengaliNumber(new Date().getFullYear())} বাংলা নিউজ ২৪। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="text-[11px]">ঢাকা অফিস: প্লট ১২, কারওয়ান বাজার, ঢাকা-১২১৫</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
