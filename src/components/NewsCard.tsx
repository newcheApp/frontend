import React from "react";
import "./NewsCard.css";

interface NewsItem {
  id: string;
  title: string;
  url: string;
  image_url: string;
  summary: string;
  date: string; // Keep this line
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const handleClick = () => {
    window.open(news.url, "_blank");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img
        src={news.image_url}
        className="card-img-top"
        alt={`Image for ${news.title}`}
      />
      <div className="card-body">
        <h5 className="card-title">{news.title}</h5>
        <p className="card-date">{formatDate(news.date)}</p>
        <p className="card-text">{news.summary}</p>
      </div>
    </div>
  );
};

export default NewsCard;
