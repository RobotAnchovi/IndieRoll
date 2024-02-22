import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWatchlist, removeFromWatchlist } from '../../redux/watchList'; // Adjust the import path according to your project structure
import { Link } from 'react-router-dom';

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
    <div>
      <h1>My Watchlist</h1>
      <ul>
        {watchlist.map((item) => (
          <li key={item.id}>
            <Link to={`/content/${item.video_id}`}>{item.title}</Link>
            <button onClick={() => handleRemoveFromWatchlist(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistPage;
