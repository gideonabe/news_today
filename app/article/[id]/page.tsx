"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
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

  useEffect(() => {
    async function fetchArticle() {
      if (!params?.id) return; // playing it safe for undefined id

      setLoading(true);
      try {
        const categoryParam = category.toLowerCase();
        const endpoint = `/api/news?category=${encodeURIComponent(categoryParam)}`;
        const res = await fetch(endpoint);
        const data = await res.json();

        const decodedUrl = decodeURIComponent(Array.isArray(params.id) ? params.id[0] : params.id);
        const found = (data || []).find((a: any) => a.url === decodedUrl);

        if (!found) {
          notFound(); // fallback to 404
        } else {
          setArticle({
            id: encodeURIComponent(found.url),
            title: found.title,
            summary: found.description || "No summary available",
            content: found.content || found.description || "",
            image: found.urlToImage || "https://via.placeholder.com/600x400",
            date: found.publishedAt,
            url: found.url,
          });
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
      <Navbar />
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span>
          <Link href="/">News</Link> / {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 space-y-6">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <p className="text-gray-500">
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-lg">{article.content}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read on original site
        </a>
      </div>
    </section>
  );
};

export default ArticlePage;
