import React from 'react';
import MovieCard from './MovieCard';
import './MovieSection.css'; // Import the CSS styles


const MovieSection = ({ title, movies }) => {
  return (
    <section>
      <h2>{title}</h2>
      <div className="movie-section">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
