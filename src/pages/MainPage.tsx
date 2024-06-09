import React, { useState, useEffect } from "react";
import NewsList from "../components/NewsList";

function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const end = currentPage * itemsPerPage;
  const mainPageUrl = `http://localhost:4242/api/news/in-range?rangeEnd=${end}`;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };

  const buttonStyle = {
    margin: "0 10px",
    padding: "10px 20px",
    fontSize: "16px",
  };

  return (
    <div>
      <NewsList fetchUrl={mainPageUrl} />
      <div style={paginationStyle}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={buttonStyle}
        >
          Previous
        </button>
        <span style={{ fontSize: "18px", margin: "0 10px" }}>
          Page {currentPage}
        </span>
        <button onClick={handleNextPage} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MainPage;
