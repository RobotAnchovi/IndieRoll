import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWatchlist, removeFromWatchlist } from "../../redux/watchList"; // Adjust the import path according to your project structure
import { Link } from "react-router-dom";
import "./Watchlist.css";
const WatchlistPage = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserWatchlist());
    }
  }, [dispatch, user]);

  const handleRemoveFromWatchlist = (watchlistId) => {
    dispatch(removeFromWatchlist(watchlistId));
  };
  return (
    <div className="watchlist-page">
      <h1>Watchlist</h1>
      {watchlist.length > 0 ? (
        <ul>
          {watchlist.map((item) => (
            <li key={item.id}>
              <Link to={`/content/${item.video_id}`}>{item.title}</Link>
              <button onClick={() => handleRemoveFromWatchlist(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Your watchlist is empty. Go <Link to="/content">here</Link> to add
          movies to your watchlist.
        </p>
      )}
    </div>
  );
};

export default WatchlistPage;
