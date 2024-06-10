import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsList from "../components/NewsList";

const CategoryNews = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryName, setCategoryName] = useState<string>("");

  const fetchUrl = `http://localhost:4242/api/news/by-tags?tagIds=${categoryId}`;

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await fetch(
          `http://localhost:4242/api/tags/${categoryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category name");
        }
        const data = await response.json();
        setCategoryName(data.displayName);
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    fetchCategoryName();
  }, [categoryId]);

  return (
    <div>
      <h2>{categoryName} News</h2>
      <NewsList fetchUrl={fetchUrl} />
    </div>
  );
};

export default CategoryNews;
