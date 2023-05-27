import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./ShowList.css"; // Import the CSS file

const ShowList = () => {
  const { keyword } = useParams();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${keyword}`
        );
        setShows(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShows();
  }, [keyword]);

  return (
    <div className="show-list">
      <h1>TV Shows</h1>
      {shows.map((show) => (
        <div className="show-item" key={show.show.id}>
          <Link to={`/tv-shows/details/${show.show.id}`}>
            <h3>{show.show.name}</h3>
          </Link>
          <p>Language: {show.show.language}</p>
          <p>Genres: {show.show.genres.join(", ")}</p>
          <p>Runtime: {show.show.runtime} minutes</p>
          <p>
            Premiered:{" "}
            {new Date(show.show.premiered).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>Rating: {show.show.rating.average}</p>
          <p>
            Country:{" "}
            {show.show.network ? show.show.network.country.name : "N/A"}
          </p>
          {show.show.image && (
            <img src={show.show.image.medium} alt={show.show.name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowList;
