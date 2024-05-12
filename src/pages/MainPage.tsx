// MainPage.js
import React from "react";
import NewsList from "../components/NewsList";

function MainPage() {
  const mainPageUrl = "http://localhost:4242/api/news/by-date?date=2024-04-23";

  return (
    <div>
      <NewsList fetchUrl={mainPageUrl} />
    </div>
  );
}

export default MainPage;
