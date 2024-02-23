import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../MovieCard';
import { fetchContentByGenre } from '../../redux/content';
import "./GenrePage.css"

const GenrePage = () => {
    const { genreName } = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.content.contents);

    useEffect(() => {
      dispatch(fetchContentByGenre(genreName));
    }, [dispatch, genreName]);

    return (
      <div>
         <h2>{genreName.replace(/-/g, ' ')} Movies</h2>
         <div>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  };

  export default GenrePage;
