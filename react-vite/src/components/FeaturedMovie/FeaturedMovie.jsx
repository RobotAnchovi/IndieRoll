import { Link, useNavigate } from "react-router-dom";
import "./FeaturedMovie.css";

const FeaturedMovie = ({ movie }) => {
    const navigate = useNavigate();

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
                        <button className='button'>Play</button>
                    </Link>
                    <button className='button list-button'>My List</button>
                    <button className='button details-button' onClick={handleDetailsClick}>Details</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FeaturedMovie;
