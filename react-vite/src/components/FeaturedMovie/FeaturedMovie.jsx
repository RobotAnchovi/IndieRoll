import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { fetchUserWatchlist, addToWatchlist } from '../../redux/watchList';
import { FaPlay, FaList } from "react-icons/fa";
import "./FeaturedMovie.css";

const FeaturedMovie = ({ movie }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => state.watchlist.watchlist);
    const isMovieInWatchlist = watchlist.some(item => item.video_id === movie.id);

    useEffect(() => {
        dispatch(fetchUserWatchlist());
    }, [dispatch]);

    const handleAddToWatchlist = () => {
        dispatch(addToWatchlist(movie.id));
    };

    const handleDetailsClick = () => {
        navigate(`/content/all/${movie.id}`, { state: { movie } });
    };

    return (
        <div className="featured-movie">
            <div className='background' style={{ backgroundImage: `url(${movie.thumbnail_url})` }}>
                <div className='right-side'>
                    <div className='title'>
                        <h1>{movie.title}</h1>
                    </div>
                    <div className='description'>
                        <p>{movie.description}</p>
                    </div>
                    <div className='info'>
                        <p>{movie.genre}</p>
                    </div>
                    <div className='buttons'>
                        <Link to={movie.video_url} className="movie-card-link">
                            <button className='button'><FaPlay />Play</button>
                        </Link>
                        {!isMovieInWatchlist && (
                            <button className='button list-button' onClick={handleAddToWatchlist}><FaList />Add to Watchlist</button>
                        )}
                        <button className='button details-button' onClick={handleDetailsClick}>Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedMovie;
