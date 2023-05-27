import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      navigate(`/tv-shows/${keyword}`);
    }
  };

  return (
    <div className="home">
      <h1>Search TV Shows</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Home;
