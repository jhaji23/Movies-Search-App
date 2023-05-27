import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowDetails = ({ match }) => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      const showId = parseInt(match.params.id, 10);
      if (isNaN(showId)) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${showId}`
        );
        setShow(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchShow();
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred. Please try again later.</div>;
  }

  if (!show) {
    return <div>Show not found.</div>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      <p>Language: {show.language}</p>
      <p>Genres: {show.genres.join(", ")}</p>
      <p>Runtime: {show.runtime} minutes</p>
      <p>
        Premiered:{" "}
        {new Date(show.premiered).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p>Rating: {show.rating.average}</p>
      <p>Country: {show.network ? show.network.country.name : "N/A"}</p>
      <img src={show.image.medium} alt={show.name} />
    </div>
  );
};

export default ShowDetails;
