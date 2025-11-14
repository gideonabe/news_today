"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react";
import Navbar2 from "@/components/Navbar2";
import ArticleDetailsSkeleton from "@/components/ArticleDetailsSkeleton";
import { cleanText } from "@/lib/utils";

type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  description: string;
  date: string;
  url: string;
};

const ArticlePage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "all";

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true); // Set initial state to true
  const [error, setError] = useState<string | null>(null);
  const [related, setRelated] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticle() {
      if (!params?.id) return;
  
      // setLoading(true); // This is now redundant since we start with true
      try {
        const searchQuery = searchParams?.get("search");
        const categoryParam = searchParams?.get("category") || "all";
  
        let endpoint = "";
  
        if (searchQuery) {
          endpoint = `/api/news?search=${encodeURIComponent(searchQuery)}`;
        } else {
          endpoint = `/api/news?category=${encodeURIComponent(categoryParam.toLowerCase())}`;
        }
  
        const res = await fetch(endpoint);
        const data = await res.json();
  
        // The ID in the URL is already decoded by Next.js
        // We need to match it with the encoded URLs in our data
        const articleId = Array.isArray(params.id) ? params.id[0] : params.id;
        
        // Try to find the article by matching the encoded URL
        const found = (data || []).find((a: any) => {
          const encodedUrl = encodeURIComponent(a.url);
          return encodedUrl === articleId;
        });
  
        if (!found) {
          // Fallback: try with decoded URL
          const decodedUrl = decodeURIComponent(articleId);
          const foundByDecoded = (data || []).find((a: any) => a.url === decodedUrl);
          
          if (!foundByDecoded) {
            notFound();
            return;
          } else {
            setArticle({
              id: encodeURIComponent(foundByDecoded.url),
              title: foundByDecoded.title,
              summary: foundByDecoded.description || "No summary available",
              content: foundByDecoded.content || foundByDecoded.description || "",
              image: foundByDecoded.urlToImage || "https://via.placeholder.com/600x400",
              author: foundByDecoded.author || "John Doe",
              description: foundByDecoded.description,
              date: foundByDecoded.publishedAt,
              url: foundByDecoded.url,
            });
  
            // Fetch related (from the same data set)
            const relatedArticles = data
              .filter((a: any) => a.url !== foundByDecoded.url)
              .slice(0, 2)
              .map((item: any) => ({
                id: encodeURIComponent(item.url),
                title: item.title,
                summary: item.description || "No summary available",
                image: item.urlToImage || "https://placehold.co/600x400/EEE/31343C",
                date: item.publishedAt,
                url: item.url,
                author: item.author || "Unknown",
                description: item.description,
                content: item.content,
              }));
  
            setRelated(relatedArticles);
          }
        } else {
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
  
          // Fetch related (from the same data set)
          const relatedArticles = data
            .filter((a: any) => a.url !== found.url)
            .slice(0, 2)
            .map((item: any) => ({
              id: encodeURIComponent(item.url),
              title: item.title,
              summary: item.description || "No summary available",
              image: item.urlToImage || "https://placehold.co/600x400/EEE/31343C",
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
  }, [params?.id, searchParams]);


  if (!article) return null;

  // Actual article page rendering
  return (
    <section>
      <Suspense fallback={<div className="pb-3 pt-3 nav-border" />}>
        <Navbar2 />
      </Suspense>

      <div className="container-article">

        {/* Breadcrumb shows even while loading */}
        <nav className="breadcrumb">
          <span className="text-sm md:text-base">
            <Link href="/">News</Link> /{" "}
            <Link
              href={`/?category=${encodeURIComponent(category.toLowerCase())}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </span>
        </nav>

        {/* Show skeleton while article is still loading */}
        {loading && (
          <div className="space-y-10">
            <Skeleton className="h-100 md:h-120 w-full rounded-lg bg-gray-300" />
            <div className="flex flex-col gap-4">
              <Skeleton className="w-48 h-6 mb-2" />
              <div className="grid gap-4 grid-cols-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-48 w-full rounded-lg bg-gray-300" />
                    <Skeleton className="h-4 w-full bg-gray-300" />
                    <Skeleton className="h-3 w-full bg-gray-300" />
                    <Skeleton className="h-3 w-full bg-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* If error */}
        {!loading && error && (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full">
            <p className="mb-4 px-4 font-semibold text-base md:text-3xl text-center">
              Oops! Something went wrong while fetching the article.<br />
              Refresh or go back to the previous page.
            </p>
            {/* <p className="text-gray-600 mb-6 text-center">{error}</p> */}
          </div>
        )}

        {/* Avoid rendering article until loaded */}
        {!loading && !error && article && (
          <>
            {/* Main Content */}
            <div className="section-main">
              <h1 className="text-article-title">{article.title}</h1>
              <p className="text-article-meta">
                By {article.author} · Published on{" "}
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <img
                src={article.image}
                alt={article.title}
                className="img-article-main"
              />

              <p className="text-article-content">{cleanText(article.content)}</p>

              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Read the full article on {new URL(article.url).hostname}
              </Link>
            </div>

            {/* Divider + Actions */}
            <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-8 w-full dark:text-gray-200">
              <div className="divider"></div>
              <div className="flex-center gap-4 md:gap-10 text-sm md:text-base w-full">
                <p className="flex gap-2 items-center"><Heart /> 1.3k</p>
                <p className="flex gap-2 items-center"><MessageSquare /> 34</p>
                <p className="flex gap-2 items-center"><Bookmark /> Save</p>
                <p className="flex gap-2 items-center"><Share2 /> Share</p>
              </div>
              <div className="divider"></div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-10 dark:text-gray-100">
                <h1 className="text-heading mb-2 md:mb-6">Related Articles</h1>
                <div className="grid gap-4 md:gap-8 md:grid-cols-2">
                  {related.map((r) => (
                    <div key={r.id} className="article-row">
                      <div className="flex flex-1 flex-col justify-between space-y-1">
                        <h3 className="text-sm font-medium text-blue">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                        <h2 className="text-base font-semibold line-clamp-2">
                          {r.title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-1 dark:text-gray-300">
                          {r.summary}
                        </p>
                        <Link
                          href={`/article/${r.id}?${
                            searchParams?.get("search")
                              ? `search=${encodeURIComponent(searchParams.get("search") || "")}`
                              : `category=${encodeURIComponent(category.toLowerCase())}`
                          }`}
                          className="text-blue text-sm md:hover:underline font-medium mt-1"
                        >
                          Read More
                        </Link>
                      </div>
                      <div className="flex justify-start w-[35%] md:w-[30%] h-35">
                        <img
                          src={r.image}
                          alt={r.title}
                          className="img-article-related"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="section-comments">
              <h1 className="text-heading">Comments (2)</h1>
              {/* Existing comments markup */}
            </div>
          </>
        )}
      </div>
    </section>

  );
};

export default ArticlePage;