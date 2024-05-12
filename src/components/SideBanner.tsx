import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBanner.css"; // Make sure this path is correct

interface Category {
  id: number;
  displayName: string;
}

const SideBanner = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:4242/api/tags/level?level=0"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="side-banner p-3">
      <Link to="/myfeed" className="btn btn-primary w-100 mb-3">
        My Feed
      </Link>
      <hr />
      <h4>Categories</h4>
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category.id} className="list-group-item">
            {category.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBanner;
