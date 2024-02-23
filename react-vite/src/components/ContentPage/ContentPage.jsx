// import { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchContentById } from '../../redux/content';
// import FeaturedMovie from '../FeaturedMovie';
// import ReviewsSection from '../ReviewsSection/ReviewsSection';

// const ContentPage = () => {

//   let { id } = useParams(); // Get the content ID from the URL.
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);

//   const state = useSelector(state => state);
//   console.log("🚀 ~ ContentPage ~ state:", state)

//   const movie = useSelector(state =>
//     state.content.contents.find(movie => movie.id == id));
//     console.log("🚀 ~ ContentPage ~ movie:", movie)

//     useEffect(() => {
//         if (!movie) {
//           setLoading(true);
//           dispatch(fetchContentById(id)).finally(() => {
//             setLoading(false);
//           });
//         }
//       }, [id, dispatch]); // Removed 'movie' from dependencies to avoid refetching when 'movie' updates

//       if (loading || !movie) { // Check for !movie here after loading is false
//         return <div>Loading...</div>; // or some "content not found" message
//       }

//   return (
//     <div>
//         <FeaturedMovie movie={movie} />
//         <ReviewsSection movie={movie} />
//     </div>
//   );
// };

// export default ContentPage;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentById } from '../../redux/content';
import FeaturedMovie from '../FeaturedMovie';
import ReviewsSection from '../ReviewsSection/ReviewsSection';

const ContentPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  // Using 'loading' state from Redux if available or managing it locally
  const loading = useSelector(state => state.content.loading);
  const movie = useSelector(state => state.content.currentContent);

  useEffect(() => {
    // Fetch content by ID only if 'movie' is not already loaded or if it's a different movie
    if (!movie || movie.id.toString() !== id) {
      dispatch(fetchContentById(id));
    }
  }, [id, movie, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !movie) {
    return <div>Content not found</div>;
  }

  return (
    <div>
      <FeaturedMovie movie={movie} />
      <ReviewsSection movie={movie} />
    </div>
  );
};

export default ContentPage;
