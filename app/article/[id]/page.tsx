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

  // Full skeleton layout
  if (loading)
    return <ArticleDetailsSkeleton />;

  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <p className="mb-4 px-4 font-semibold text-base md:text-3xl text-center">Oops! Something went wrong while fetching the articles. <br /> Refresh or go back to Previous page</p>
      <p className="text-gray-600 mb-6 text-center">{error}</p>
    </div>
  )

  if (!article) return null;

  // Actual article page rendering
  return (
    <section>
      <Suspense fallback={<div className="h-16" />}>
        <Navbar2 />
      </Suspense>
      <div className="max-w-[95%] md:max-w-[75%] mx-auto">

        {/* Breadcrumb */}
        <nav className="text-lg text-gray-500 dark:text-gray-200 mb-4 mt-4 md:mt-8">
          <span className="text-sm md:text-base">
            <Link href="/">News</Link> /{" "}
            <Link
              href={`/?category=${encodeURIComponent(category.toLowerCase())}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </span>
        </nav>


        <div className="max-w-full mx-auto mt-2 md:mt-6 space-y-4 md:space-y-6 dark:text-gray-100">
          <h1 className="text-2xl  md:text-5xl font-semibold md:font-bold md:w-[80%] md:leading-14">{article.title}</h1>
          <p className=" text-gray-500 dark:text-gray-400 font-sans">By {article.author} &middot; Published on {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-90 md:h-110 object-cover rounded-lg"
          />
          <p className="text-base md:text-lg">{cleanText(article.content)}</p>
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue md:hover:underline"
          >
            Read the full article on {new URL(article.url).hostname}
          </Link>

        </div>
        
        {/* Features */}
        <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-8 w-full dark:text-gray-200">
          <div className="w-full h-px bg-gray-400"></div>
          <div className="flex justify-center items-center gap-4 md:gap-10 text-sm md:text-base w-full">
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
          <div className="mt-10 dark:text-gray-100">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 md:mb-6">Related Articles</h1>
            <div className="grid gap-4 md:gap-8 md:grid-cols-2">
              {related.map((r) => (
                <div
                  key={r.id}
                  className="flex gap-4 overflow-hidden items-start"
                >
                  <div className="flex flex-1 flex-col justify-between  space-y-1">
                    <h3 className="text-sm font-medium text-blue">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <h2 className="text-base font-semibold line-clamp-2">{r.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1 dark:text-gray-300">{r.summary}</p>
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
                      className="w-full h-full object-cover rounded-xl"
                    />

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="mt-8 flex flex-col gap-6 mb-8 ">
          <h1 className="font-semibold text-xl md:text-2xl dark:text-gray-100">Comments (2)</h1>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex gap-2 items-start">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr54cG9SEpRjXrBRIU75-QcQu-1jlw_3ZhDg&s" 
                alt="Profile Avatar" 
                className='rounded-full w-12 h-auto max-h-full object-cover'
              />
              <div className="flex flex-col items-start">
                <div className="flex gap-2 items-center">
                  <h2 className="text-sm md:text-base font-semibold dark:text-gray-100">Ethan Carter</h2>
                  <p className="text-xs md:text-sm dark:text-gray-200">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-sm dark:text-gray-200">Great coverage of the conference! It's exciting to see the progress in AI and sustainable tech.</p>
              </div>
            </div>
            <div className="ml-12 flex gap-2 items-center">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOHEcUTVj5rBCmAxMx-btDnAK5tGda8i5aiQ&s" 
                alt="Profile Avatar" 
                className='rounded-full w-12 h-12 object-cover'
              />
              <div className="flex flex-col items-start">
                <div className="flex gap-2 items-center">
                  <h2 className=" font-semibold dark:text-gray-100">Olivia Bennet</h2>
                  <p className="text-sm dark:text-gray-200">{new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-sm dark:text-gray-200">I agree! The focus on ethical considerations is also very important.</p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-400"></div>

          <div className="flex flex-col gap-3">
            <div className="w-full flex gap-3 items-start">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmvH7dnlgLKKhHQGzku44nvGWNSwsA1xuL3_1O7bwiJfZ1uh8fIa5kLnFbnAWP5emjo4&usqp=CAU" alt="Profile Avatar" className='rounded-full w-12 h-12 object-cover bg-orange-500'/>
              <textarea 
                name="" 
                id="" 
                placeholder="Add a comment..." 
                className="bg-gray-200 w-full h-25 pt-4 pl-4 p-2 rounded-lg text-gray-500 dark:text-gray-700 placeholder:dark:text-gray-700"
              >
              </textarea>
            </div>
            <button className="self-end bg-blue text-white py-2 px-4 rounded-lg">Post Comment</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlePage;