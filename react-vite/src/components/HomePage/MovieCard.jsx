// React component
import React from 'react';
import './MovieCard.css'; // Import the CSS styles

const MovieCard = ({ movie }) => {
  return (
    <a href={movie.video_url} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-thumbnail">
          <img src={movie.thumbnail_url} alt={movie.title} />
          <div className="movie-title">{movie.title}</div>
        </div>
      </div>
    </a>
  );
};

export default MovieCard;
