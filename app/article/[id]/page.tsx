"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react";
import Navbar2 from "@/components/Navbar2";

type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  description: string,
  date: string;
  url: string;
};

const ArticlePage = () => {
  const params = useParams(); // dynamic route param
  const searchParams = useSearchParams(); 
  const category = searchParams?.get("category") || "all";

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [related, setRelated] = useState<Article[]>([]);


  useEffect(() => {
    async function fetchArticle() {
      if (!params?.id) return;
  
      setLoading(true);
      try {
        const categoryParam = category.toLowerCase();
        const endpoint = `/api/news?category=${encodeURIComponent(categoryParam)}`;
        const res = await fetch(endpoint);
        const data = await res.json();
  
        const decodedUrl = decodeURIComponent(Array.isArray(params.id) ? params.id[0] : params.id);
        const found = (data || []).find((a: any) => a.url === decodedUrl);
  
        if (!found) {
          notFound();
        } else {
          // Set the main article
          setArticle({
            id: encodeURIComponent(found.url),
            title: found.title,
            summary: found.description || "No summary available",
            content: found.content || found.description || "",
            image: found.urlToImage || "https://via.placeholder.com/600x400",
            author: found.author || "John Doe",
            description: found.description,
            date: found.publishedAt,
            url: found.url,
          });
  
          // Find up to 2 related articles (same category, not the same URL)
          const relatedArticles = data
            .filter((a: any) => a.url !== found.url)
            .slice(0, 2)
            .map((item: any) => ({
              id: encodeURIComponent(item.url),
              title: item.title,
              summary: item.description || "No summary available",
              image: item.urlToImage || "https://via.placeholder.com/400x250",
              date: item.publishedAt,
              url: item.url,
              author: item.author || "Unknown",
              description: item.description,
              content: item.content,
            }));
  
          setRelated(relatedArticles);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    }
  
    fetchArticle();
  }, [params?.id, category]);
  

  if (loading)
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <Skeleton className="h-96 w-full mb-4" />
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!article) return null;

  return (
    <section>
      <Navbar2 />
      <div className="max-w-[75%] mx-auto">

        {/* Breadcrumb */}
        <nav className="text-lg text-gray-500 mb-4 mt-8">
          <span>
            <Link href="/">News</Link> / {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </nav>

        <div className="max-w-full mx-auto mt-6 space-y-6">
          <h1 className="text-5xl font-bold w-[75%]">{article.title}</h1>
          <p className=" text-gray-500 font-sans">By {article.author} &middot; Published on {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-110 object-cover rounded-lg"
          />
          <p className="text-lg">{article.content}</p>
        </div>
        
        {/* Features */}
        <div className="flex flex-col gap-6 mt-8">
          <div className="w-full h-px bg-gray-400"></div>
          <div className="flex justify-center items-center gap-10">
            <p className="flex gap-2 items-center">
              <Heart />
              1.3k
            </p>
            <p className="flex gap-2 items-center">
              <MessageSquare />
              34
            </p>
            <p className="flex gap-2 items-center">
              <Bookmark />
              Save
            </p>
            <p className="flex gap-2 items-center">
              <Share2 />
              Share
            </p>
          </div>
          <div className="w-full h-px bg-gray-400"></div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-10">
            <h1 className="text-3xl font-semibold mb-6">Related Articles</h1>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((r) => (
                <div
                  key={r.id}
                  className="flex overflow-hidden items-start"
                >
                  <div className="flex flex-1 flex-col justify-between  space-y-1">
                    <h3 className="font-medium text-blue">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <h2 className="text-lg font-semibold line-clamp-2">{r.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">{r.summary}</p>
                    <Link
                      href={`/article/${r.id}?category=${encodeURIComponent(category)}`}
                      className="text-blue hover:underline font-medium mt-1"
                    >
                      Read More
                    </Link>
                  </div>
                  <div className="flex justify-start w-[30%] h-35">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover rounded-xl"
                    />

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read on original site
        </a> */}
      </div>
    </section>
  );
};

export default ArticlePage;
