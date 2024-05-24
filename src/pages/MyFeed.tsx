import React, { useMemo } from "react";
import NewsList from "../components/NewsList";
import { useAuth } from "../pages/AuthContext"; // Ensure the path is correct

function MyFeed() {
  const { user } = useAuth();

  const feedUrl = useMemo(() => {
    if (!user || !Array.isArray(user.tags) || user.tags.length === 0) {
      console.log("No user or user has no tags");
      return null;
    }

    // Check if each tag is an object with an 'id' property
    const tags = user.tags
      .filter((tag) => typeof tag === "object" && "id" in tag)
      .map((tag) => tag.id)
      .join(",");

    if (tags.length === 0) {
      console.log("No valid tags found");
      return null;
    }

    const today = new Date().toISOString().slice(0, 10); // Format today's date
    const url = `http://localhost:4242/api/news/by-tags-date?date=${today}&tags=${tags}`;
    console.log("Fetching URL:", url); // Log the correctly constructed URL

    return url;
  }, [user]);

  return (
    <div>
      <h1>My Feed</h1>
      {feedUrl ? (
        <NewsList fetchUrl={feedUrl} />
      ) : (
        <p>Loading personalized feed or insufficient data to fetch news.</p>
      )}
    </div>
  );
}

export default MyFeed;
