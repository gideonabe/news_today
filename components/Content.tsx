"use client"

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';


type Article = {
  id: string;        // we can use the URL as a unique ID
  title: string;
  summary: string;   // from description
  image: string;     // from urlToImage
  date: string;      // from publishedAt
  url: string;       // link to the full article
};


const Content = () => {
  const categories = ["All", "Top stories", "World", "Politics", "Business", "Tech"];
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // for error handling
  const [error, setError] = useState<string | null>(null);


  // Debounce effect (wait for user to stop typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 600); // wait 600ms after last keystroke

    return () => clearTimeout(handler); // cleanup on each keystroke
  }, [searchQuery]);


  
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        // const endpoint = searchTerm
        //   ? `/api/news?search=${encodeURIComponent(searchTerm)}`
        //   : `/api/news?category=${selectedCategory === "All" ? "all" : selectedCategory.toLowerCase()}`;

        let endpoint = "";

        if (debouncedQuery) {
          // If user is searching, ignore category
          endpoint = `/api/news?search=${encodeURIComponent(debouncedQuery)}`;
        } else {
          // Otherwise, fetch based on category
          const categoryParam =
            selectedCategory === "All" ? "all" : selectedCategory.toLowerCase();
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
    
        // Map API response to Article[]
        const mappedArticles: Article[] = (data || []).map((item: any) => ({
          id: encodeURIComponent(item.url),               // unique ID
          title: item.title,
          summary: item.description || "No summary available.",
          image: item.urlToImage || "https://via.placeholder.com/600x400", // fallback image
          date: item.publishedAt,
          url: item.url
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
  


  return (
    <section className="max-w-[75%] mx-auto mt-8 mb-18">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setDebouncedQuery(searchQuery);
          }}
          placeholder="Search for news, topics..."
          className="bg-white pl-14 pr-24 py-4 border border-gray-300 rounded-sm w-full text-gray-800"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-start gap-4 my-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selectedCategory === cat
                ? "bg-blue text-white"
                : "bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading State with Skeleton */}
      {loading && (
        <div className="space-y-10">
          {/* Featured Article Skeleton */}
          <Skeleton className="h-120 w-full rounded-lg bg-gray-300" />

          {/* Recent Articles Skeleton */}
          <div className="flex flex-col gap-4">
            <Skeleton className="w-48 h-6 mb-2" /> {/* heading skeleton */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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



      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => {
              if (debouncedQuery) {
                // Retry search
                setDebouncedQuery(searchQuery);
              } else {
                // Retry category fetch
                setSelectedCategory(selectedCategory); // triggers useEffect again
              }
            }}
            className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && articles.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No articles found.</p>
          {debouncedQuery ? (
            <p className="text-base text-gray-400">
              Try searching for a different keyword.
            </p>
          ) : (
            <p className="text-base text-gray-400">
              Try selecting a different category.
            </p>
          )}
        </div>
      )}

      {/* Articles */}
      {!loading && !error && articles.length > 0 && (
        <div className="w-full space-y-10">
          {/* Featured Article */}
          <div className="relative h-120 bg-gray-900 text-white rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60"></div>

            <div className="absolute inset-0 flex flex-col gap-4 justify-end p-6">
              <h2 className="text-5xl font-bold font-sans mb-3 drop-shadow-md w-[80%]">
                {articles[0].title}
              </h2>
              <p className="text-gray-200 mb-4 w-[80%] ">
                {articles[0].summary}
              </p>
              <Link
                // href={articles[0].url}
                // href={`/article/${articles[0].id}?category=${selectedCategory.toLowerCase()}`}
                href={`/article/${articles[0].id}?category=${encodeURIComponent(selectedCategory.toLowerCase())}`}
                className="bg-blue hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-md w-fit"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-3xl">Recent Articles</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(1).map((article) => (
                <div key={article.id} className="overflow-hidden group">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-lg group-hover:rounded-b-none transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-70 transition-opacity rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        href={`/article/${article.id}?category=${encodeURIComponent(selectedCategory.toLowerCase())}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 text-left">
                    <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {article.summary}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Content