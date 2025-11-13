"use client"

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

type Article = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  url: string;
};

const Content = () => {
  const categories = ["All", "Top stories", "World", "Politics", "Business", "Tech"];
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromQuery = searchParams?.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Immediately set the debouncedQuery when Enter is pressed
      setDebouncedQuery(searchQuery.trim());
    }
  };

  // Debounce the search input
  useEffect(() => {
    if (!searchQuery) return setDebouncedQuery("");

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 600);

    return () => clearTimeout(handler);
  }, [searchQuery]);


  // Keep selected category in sync with URL query
  useEffect(() => {
    const formatted = categoryFromQuery.charAt(0).toUpperCase() + categoryFromQuery.slice(1);
    if (formatted !== selectedCategory) {
      setSelectedCategory(formatted);
    }
  }, [categoryFromQuery]);

  // Fetch articles whenever category or search changes
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        let endpoint = "";

        if (debouncedQuery) {
          endpoint = `/api/news?search=${encodeURIComponent(debouncedQuery)}`;
        } else {
          const categoryParam = selectedCategory === "All" ? "all" : selectedCategory.toLowerCase();
          endpoint = `/api/news?category=${encodeURIComponent(categoryParam)}`;
        }

        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data || data.length === 0) {
          setArticles([]);
          return;
        }

        const mappedArticles: Article[] = data.map((item: any) => ({
          id: encodeURIComponent(item.url),
          title: item.title,
          summary: item.description || "No summary available.",
          image: item.urlToImage || "https://via.placeholder.com/600x400",
          date: item.publishedAt,
          url: item.url,
        }));

        setArticles(mappedArticles);
      } catch (err: any) {
        console.error("Error fetching articles:", err);
        setError(err.message || "Something went wrong while loading articles.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [selectedCategory, debouncedQuery]);

  // Handle category click
  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);

    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat.toLowerCase());
    }

    router.replace(`/?${params.toString()}`);
  };

  return (
    <section className="max-w-[90%] md:max-w-[75%] mx-auto mt-8 mb-8 md:mb-18">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search for news, topics..."
          className="bg-white pl-14 pr-24 py-4 border border-gray-300 rounded-sm w-full text-gray-800"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 my-6 md:my-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition ${
              selectedCategory === cat
                ? "bg-blue text-white"
                : "bg-gray-200/20 text-gray-700 dark:text-gray-200 border-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading, Error, Empty, and Articles display remain unchanged */}
      {loading && (
        <div className="space-y-10">
          <Skeleton className="h-100 md:h-120 w-full rounded-lg bg-gray-300" />
          <div className="flex flex-col gap-4">
            <Skeleton className="w-48 h-6 mb-2" />
            <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-48 w-full rounded-lg bg-gray-300" />
                  <Skeleton className="h-4 w-3/4 bg-gray-300" />
                  <Skeleton className="h-3 w-full bg-gray-300" />
                  <Skeleton className="h-3 w-5/6 bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => {
              if (debouncedQuery) setDebouncedQuery(searchQuery);
              else setSelectedCategory(selectedCategory);
            }}
            className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No articles found.</p>
          {debouncedQuery
            ? <p className="text-base text-gray-400">Try searching for a different keyword.</p>
            : <p className="text-base text-gray-400">Try selecting a different category.</p>
          }
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="w-full space-y-10">
          {/* Featured Article */}
          <div className="relative h-100 md:h-120 bg-gray-900 text-white rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60"></div>
            <div className="absolute inset-0 flex flex-col gap-1 md:gap-4 justify-end p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 md:w-[80%] line-clamp-2 leading-tight">{articles[0].title}</h2>
              <p className="text-gray-200 mb-4 md:w-[80%] line-clamp-2 md:line-clamp-6 leading-7">{articles[0].summary}</p>
              <Link
                href={`/article/${articles[0].id}?category=${encodeURIComponent(selectedCategory.toLowerCase())}`}
                className="bg-blue hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 text-base md:text-lg rounded-md w-fit"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-3xl">Recent Articles</h1>
            <div className="grid gap-8 md:gap-10 grid-cols-2 lg:grid-cols-3">
              {articles.slice(1).map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}?category=${encodeURIComponent(selectedCategory.toLowerCase())}`}  
                >
                  <div className="overflow-hidden group">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-40 md:h-48 object-cover rounded-lg group-hover:rounded-b-none transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-70 transition-opacity rounded-t-lg"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Read More</span>
                      </div>
                    </div>
                    <div className="pt-2 text-left">
                      <h2 className="text-base md:text-lg dark:text-gray-100 font-semibold mb-2 line-clamp-3">{article.title}</h2>
                      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 line-clamp-2">{article.summary}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Content;
