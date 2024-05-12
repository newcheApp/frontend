import React, { useMemo } from "react";
import NewsList from "../components/NewsList";
import { useAuth } from "../pages/AuthContext"; // Ensure the path is correct

function MyFeed() {
  const { user } = useAuth();

  const feedUrl = useMemo(() => {
    if (!user || !user.tags || user.tags.length === 0) {
      console.log("No user or user has no tags");
      return null;
    }

    // Assuming user.tags is an array of string IDs
    const tags = user.tags.join(","); // No need to map, just join
    const today = new Date().toISOString().slice(0, 10); // Format today's date
    const url = `http://localhost:4242/api/news/by-tags-date?date=${today}&tags=${tags}`;
    console.log("Fetching URL:", url); // Log the correctly constructed URL
    return url;
  }, [user, user?.tags]);

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
