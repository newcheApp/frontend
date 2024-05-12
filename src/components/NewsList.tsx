// NewsList.js
import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
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
      }
    };

    fetchNews();
  }, [fetchUrl]); // Dependency on fetchUrl ensures re-fetch when it changes

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
