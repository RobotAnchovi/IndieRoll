import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie, onAddToWatchlist }) => {

  const navigate = useNavigate();

  // Function to handle adding to watchlist
  const handleAddToWatchlist = (event) => {
    event.preventDefault();
    onAddToWatchlist(movie); // Might need to change function to add to watchlist after I know the reducers
  };

  const handleDetailsClick = () => {
    navigate(`/content/all/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="movie-card-container">
      <div className="movie-card-link" onClick={handleDetailsClick}>
        <div className="movie-card">
          <div className="movie-thumbnail">
            <img src={movie.thumbnail_url} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
            {/* Icon for adding to watchlist */}
            <button className="watchlist-icon" onClick={handleAddToWatchlist}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
