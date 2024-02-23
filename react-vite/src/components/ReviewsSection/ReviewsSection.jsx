import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/reviews';
import './ReviewsSection.css';

const ReviewsSection = () => {
  const { id } = useParams();
//   console.log("🚀 ~ ReviewsSection ~ id:", id);

  const dispatch = useDispatch();

  // Directly using reviews from the store, eliminating local state.
  const reviews = useSelector(state =>
    state.reviews.reviews.filter(review => review.id.toString() === id));

  useEffect(() => {
    // Only fetch reviews if they are not already present for the current id.
    if (reviews.length === 0) {
      dispatch(fetchReviews(id));
    }
    // This effect should only run when `id` changes, or the length of reviews for the current id changes.
  }, [id, reviews.length, dispatch]);

//   console.log("🚀 ~ ReviewsSection ~ reviews:", reviews)

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>{review.rating}: {review.review_text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
