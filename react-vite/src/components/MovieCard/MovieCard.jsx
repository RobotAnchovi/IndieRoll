import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWatchlist, addToWatchlist, removeFromWatchlist } from '../../redux/watchList';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserWatchlist());
  }, [dispatch]);

  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const isMovieInWatchlist = watchlist.some(item => item.video_id === movie.id);

  const addToWatchlistHandler = (event) => {
    event.preventDefault();
    console.log("🚀 ~ MovieCard ~ add movie:", movie);
    dispatch(addToWatchlist(movie.id));
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
          </div>
        </div>
      </div>

      {!isMovieInWatchlist && (
        <button className="watchlist-icon-2" onClick={addToWatchlistHandler}>
          <FaPlus /> Add to Watchlist
        </button>
      )}
    </div>
  );
};



export default MovieCard;
