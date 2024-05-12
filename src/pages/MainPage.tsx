// MainPage.js
import React from "react";
import NewsList from "../components/NewsList";

function MainPage() {
  const mainPageUrl = "http://localhost:4242/api/news/reverse";

  return (
    <div>
      <NewsList fetchUrl={mainPageUrl} />
    </div>
  );
}

export default MainPage;
