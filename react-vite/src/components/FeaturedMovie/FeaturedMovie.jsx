// import React from 'react';
import "./FeaturedMovie.css";
import { FaPlay, FaList } from "react-icons/fa";

const FeaturedMovie = ({ movie }) => {
  console.log(movie);
  return (
    <div className="featured-movie">
      <div
        className="background"
        style={{ backgroundImage: `url(${movie.thumbnail_url})` }}>
        <div className="right-side">
          <div className="title">
            <h1>{movie.title}</h1>
          </div>
          <div className="description">
            <p>{movie.description}</p>
          </div>
          <div className="info">
            <p>{movie.genre}</p>
          </div>
          <div className="buttons">
            <button className="button">
              {" "}
              <FaPlay />
              Play
            </button>
            <button className="button list-button">
              <FaList />
              My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
