import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWatchlist, removeFromWatchlist } from "../../redux/watchList";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./Watchlist.css";

const WatchlistPage = () => {
  const state = useSelector((state) => state);
  console.log("🚀 ~ Watchlistpage ~ state:", state);

  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);

  console.log("🚀 ~ WatchlistPage ~ watchlist:", watchlist);
  console.log("🚀 ~ WatchlistPage ~ watchlist.id:", watchlist.user_id);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserWatchlist());
    }
  }, [dispatch, user]);

  // Corrected remove function
  const handleRemoveFromWatchlist = (watchlistId) => {
    console.log("🚀 ~ WatchlistPage ~ watchlistId:", watchlistId);
    dispatch(removeFromWatchlist(watchlistId));
  };

  return (
    <div className="watchlist-page">
      <h1>Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <div className="watchlist-item" key={item.id}>
              <Link to={`/content/all/${item.video_id}`}>
                <img src={item.thumbnail_url} alt={item.title} />
              </Link>
              <div className="watchlist-item-details">
                <Link to={`/content/all/${item.video_id}`}>{item.title}</Link>
                <button
                  onClick={() => handleRemoveFromWatchlist(item.watchlist_id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
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
