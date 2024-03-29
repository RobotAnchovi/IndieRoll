import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../MovieCard';
import { fetchContentByGenre } from '../../redux/content';
import "./GenrePage.css"

const GenrePage = () => {
  const genreName = useParams().genreName.replace(/-/g, ' ').toLowerCase();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.content.genreContents[genreName] || []);

    useEffect(() => {
      dispatch(fetchContentByGenre(genreName));
    }, [dispatch, genreName]);

    const displayGenreName = capitalizeFirstLetter(genreName.replace(/-/g, ' '));

    return (
      <div className="genre-page">
          <h2>{displayGenreName} Movies</h2>
         <div className="genre-grid">
          {movies.map(movie => (
            <div className="genre-item" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  function capitalizeFirstLetter(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  export default GenrePage;
