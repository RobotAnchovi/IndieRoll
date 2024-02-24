import { useEffect ,useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentById } from '../../redux/content';
import FeaturedMovie from '../FeaturedMovie';
import ReviewsSection from '../ReviewsSection/ReviewsSection';

const ContentPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const isAuthenticated = useSelector(state => state.session.user);
  const loading = useSelector(state => state.content.loading);
  const movie = useSelector(state => state.content.currentContent);

  const [triggerFetch, setTriggerFetch] = useState(false);


  useEffect(() => {

    if (isAuthenticated) {
      dispatch(fetchContentById(id));
    }
  }, [id, isAuthenticated, dispatch, triggerFetch]);


  useEffect(() => {
    return () => setTriggerFetch(false);
  }, [id]);

  const isOwner = movie?.user_id === isAuthenticated?.id;

  const handleUpdateClick = () => {
    navigate(`/edit-film/${id}`, { state: { content: movie } });
  };
  useEffect(() => {
    if (isAuthenticated) {
        if (!movie || movie.id.toString() !== id) {
          dispatch(fetchContentById(id));
        }
      }
  }, [id, movie, dispatch, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!loading && !movie) {
    return <div>Content not found</div>;
    // return <Navigate to="/content" replace />;
  }

  return (
    <div>
      <FeaturedMovie movie={movie} />
      {isOwner && (
        <button onClick={handleUpdateClick}>Update</button>
      )}
      <ReviewsSection movie={movie} />
    </div>
  );
};

export default ContentPage;
