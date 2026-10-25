import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import HeaderPage from "@/components/Header";
import NavLinks from "@/components/NavLinks";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাংলা নিউজ ২৪ | নির্ভরযোগ্য সংবাদের ঠিকানা",
  description: "বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, বিশ্লেষণ ও বিশেষ প্রতিবেদন।",
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('bangla_news_theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${notoSerifBengali.variable} ${notoSerifBengali.className} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col pb-16 md:pb-0 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <ReadingProgressBar />
            <HeaderPage />
            <div className="sticky top-0 z-30">
              <NavLinks />
            </div>
            <Marquee />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
