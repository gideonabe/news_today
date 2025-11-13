import Navbar from "@/components/Navbar";
import Articles from "@/components/Content";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import ArticlesSkeleton from "@/components/ArticleSkeleton";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>

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