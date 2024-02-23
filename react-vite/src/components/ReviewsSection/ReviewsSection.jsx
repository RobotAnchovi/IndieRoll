import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/reviews';
import './ReviewsSection.css';

const ReviewsSection = () => {
  const { id } = useParams();

  const state = useSelector(state => state);

  const dispatch = useDispatch();

  const reviews = useSelector(state => state.reviews.reviews);

  useEffect(() => {
    // Only fetch reviews if they are not already present for the current id.
    if (reviews.length === 0) {
      dispatch(fetchReviews(id));
    }
    // This effect should only run when `id` changes, or the length of reviews for the current id changes.
  }, [id, reviews.length, dispatch]);


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
