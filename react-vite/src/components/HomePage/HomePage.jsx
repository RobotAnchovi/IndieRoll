import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchVideoContent } from '../../redux/content'; // Import the fetchVideoContent action
import './Homepage.css';
import MovieSection from '../MovieSection';
import FeaturedMovie from '../FeaturedMovie';

function Homepage() {

  const state = useSelector(state => state);
  console.log("🚀 ~ Homepage ~ state:", state)

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.session.user);
  const content = useSelector(state => state.content.contents);
  console.log("🚀 ~ Homepage ~ content:", content)



  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchVideoContent());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchVideoContent());
  }, [dispatch]);

  const featured = content[0];
  const fantasyMovies = content.filter(movie => movie.genre === 'Fantasy');
  const actionMovies = content.filter(movie => movie.genre === 'Action');
  const comedyMovies = content.filter(movie => movie.genre === 'Comedy');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="homepage">
      {featured && <FeaturedMovie movie={featured} />}
      <MovieSection title="Fantasy" movies={fantasyMovies} />
      <MovieSection title="Action" movies={actionMovies} />
      <MovieSection title="Comedy" movies={comedyMovies} />
    </div>
  );
}

export default Homepage;
