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
      <div>
          <h2>{displayGenreName} Movies</h2>
         <div>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  };

  function capitalizeFirstLetter(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  export default GenrePage;
