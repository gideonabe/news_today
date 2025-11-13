import Navbar from "@/components/Navbar";
import Articles from "@/components/Content";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import ArticlesSkeleton from "@/components/ArticleSkeleton";

export async function generateMetadata() {
  return {
    title: "NewsToday - Responsive Modern News Platform",
    description:
      "NewsToday is a sleek, responsive news website built with Next.js 13, React, and Tailwind CSS. It features a dynamic, multi-category navigation bar, dark/light mode toggle, mobile-first design, and smooth animations, offering an engaging and modern interface for browsing news across devices.",
    keywords:
      "news daily current business tech top headlines breaking news",
    authors: [{ name: "Gideon Abe" }],
    icons: {
      icon: "/news.png",
    },
    
    metadataBase: new URL("https://newstoday-nu.vercel.app/"),
  };
}


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Page content fills the available space */}
      <div className="grow">
        <Suspense fallback={<ArticlesSkeleton />}>
          <Articles />
        </Suspense>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </main>
  );
}
