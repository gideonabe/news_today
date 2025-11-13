import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const country = "us";
  const apiKey = process.env.NEWS_API_KEY!;
  const pageSize = 7;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  let url: string;

  // If a search term is provided, prioritize search
  if (search && search.trim().length > 0) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&language=en&pageSize=${pageSize}&apiKey=${apiKey}`;
  }
  // Otherwise, handle category as before
  else if (category === "all") {
    url = `https://newsapi.org/v2/everything?q=latest&language=en&pageSize=${pageSize}&apiKey=${apiKey}`;
  } else if (category === "top stories") {
    url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&apiKey=${apiKey}`;
  } else {
    let catParam: string;
    switch (category) {
      case "business":
        catParam = "business";
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${catParam}&pageSize=${pageSize}&apiKey=${apiKey}`;
        break;
      case "tech":
        catParam = "technology";
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${catParam}&pageSize=${pageSize}&apiKey=${apiKey}`;
        break;
      case "politics":
        url = `https://newsapi.org/v2/everything?q=politics&language=en&pageSize=${pageSize}&apiKey=${apiKey}`;
        break;
      case "world":
        url = `https://newsapi.org/v2/everything?q=world&language=en&pageSize=${pageSize}&apiKey=${apiKey}`;
        break;
      default:
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&pageSize=${pageSize}&apiKey=${apiKey}`;
        break;
    }
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "NewsAPI request failed" }, { status: res.status });
    }

    return NextResponse.json(data.articles || []);
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
