import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard";
import "./MovieSection.css";

const CARD_WIDTH = 300; // Adjust this to the actual width of the MovieCard with margins

const MovieSection = ({ title, movies }) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MOVIES_PER_ROW = Math.floor(viewportWidth / CARD_WIDTH);
  const maxOffset = CARD_WIDTH * (1 + movies.length - MOVIES_PER_ROW);

  const handlePrevClick = () => {
    setOffset((prevOffset) => Math.max(prevOffset - CARD_WIDTH, 0));
  };

  const handleNextClick = () => {
    setOffset((prevOffset) => Math.min(prevOffset + CARD_WIDTH, maxOffset));
  };

  const isRightArrowDisabled = offset >= maxOffset;

  // view all button link
    const handleViewAllClick = () => {
      navigate(`/content/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <section>
      <h2>{title}</h2>
      <button onClick={handleViewAllClick} className='viewall'>
        View All
      </button>
      <div className="movie-section">
        <button
          onClick={handlePrevClick}
          className="arrow left"
          disabled={offset === 0}>
          &lt;
        </button>
        <div
          className="movie-container"
          style={{ transform: `translateX(-${offset}px)` }}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button
          onClick={handleNextClick}
          className="arrow right"
          disabled={isRightArrowDisabled}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default MovieSection;

// --- My backup code ---

// import MovieCard from './MovieCard';
// import './MovieSection.css';

// const MovieSection = ({ title, movies }) => {
//   return (
//     <section>
//       <h2>{title}</h2>
//       <div className="movie-section">
//         {movies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </section>
//   );
// };
