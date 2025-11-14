"use client";

import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Keep selected category in sync with URL query
  useEffect(() => {
    const categoryFromQuery = searchParams?.get("category") || "All";
    const formatted = categoryFromQuery.charAt(0).toUpperCase() + categoryFromQuery.slice(1);
    setSelectedCategory(formatted);
    
    // Also set search query from URL
    const searchFromQuery = searchParams?.get("search") || "";
    setSearchQuery(searchFromQuery);
    setDebouncedQuery(searchFromQuery);
  }, [searchParams]);

  // Debounce the search input
  useEffect(() => {
    if (!searchQuery) return setDebouncedQuery("");

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 600);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch articles whenever category or search changes
  useEffect(() => {
    async function fetchArticles() {

      // setLoading(true); // This is now redundant since we start with true

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
          image: item.urlToImage || "https://placehold.co/600x400/EEE/31343C",
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search key down (Enter)
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const queryValue = e.currentTarget.value.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (queryValue) {
        params.set("search", queryValue);
        params.delete("category"); // Clear category when searching
      } else {
        params.delete("search");
      }

      router.replace(`/?${params.toString()}`);
      e.currentTarget.blur();
    }
  };

  // Handle category click
  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);

    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat.toLowerCase());
    }
    // Clear search when selecting category
    params.delete("search");
    setSearchQuery("");
    setDebouncedQuery("");

    router.replace(`/?${params.toString()}`);
  };

  return (
    <section className="container-content">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search for news, topics..."
          className="input-main-search"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 my-6 md:my-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`category-btn ${
              selectedCategory === cat
                ? "category-btn--active"
                : "category-btn--inactive"
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
          <p className='text-xl md:text-3xl mb-4 '>Don't worry, it's just a little something, <br /> Kindly try again</p>
          {/* <p className="text-red-500 mb-4">{error}</p> */}
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
          <div className="featured-card">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="media-cover opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70"></div>
            <div className="absolute inset-0 flex flex-col gap-1 md:gap-3 justify-end p-6">
              <h2 className="featured-article-title">{articles[0].title}</h2>
              <p className=" mb-4 md:w-[80%] line-clamp-2 md:line-clamp-6 leading-7">{articles[0].summary}</p>
              <Link
                href={`/article/${articles[0].id}?${
                  debouncedQuery
                    ? `search=${encodeURIComponent(debouncedQuery)}`
                    : `category=${encodeURIComponent(selectedCategory.toLowerCase())}`
                }`}
                className="bg-blue hover:bg-blue-700 px-4 md:px-6 py-2 md:py-3 text-base md:text-lg rounded-md w-fit"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-2xl">Recent Articles</h1>
            <div className="grid-articles">
              {articles.slice(1).map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}?${
                    debouncedQuery
                      ? `search=${encodeURIComponent(debouncedQuery)}`
                      : `category=${encodeURIComponent(selectedCategory.toLowerCase())}`
                  }`}
                >
                  <div className="overflow-hidden group">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="img-article-grid"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-70 transition-opacity rounded-t-lg"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Read More</span>
                      </div>
                    </div>
                    <div className="pt-2 text-left">
                      <h2 className="text-foreground text-base dark:text-gray-100 font-semibold mb-2 line-clamp-3">{article.title}</h2>
                      <p className="text-sm text-gray-400 dark:text-gray-300 mb-2 line-clamp-2">{article.summary}</p>
                      <p className="text-sm text-gray-300 dark:text-gray-400">
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