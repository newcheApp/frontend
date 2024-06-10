import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  date: string; // Added date property
}

interface NewsListProps {
  fetchUrl: string;
}

function NewsList({ fetchUrl }: NewsListProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNewsItems(data);
      } catch (e) {
        console.error("Fetch error: ", e);
        setError("Failed to fetch news items. Please try again later.");
      }
    };

    fetchNews();
  }, [fetchUrl]);

  return (
    <>
      {error && <p>{error}</p>}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {newsItems.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </>
  );
}

export default NewsList;
