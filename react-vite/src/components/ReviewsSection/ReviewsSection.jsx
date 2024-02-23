import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, deleteReview, updateReview } from '../../redux/reviews';
import './ReviewsSection.css';

const ReviewsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.reviews);
  const currentUserId = useSelector(state => state.session.user.id);

  // Form state
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    if (reviews.length === 0) {
      dispatch(fetchReviews(id));
    }
  }, [id, reviews.length, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reviewData = {
      video_id: id,
      rating: parseInt(rating, 10),
      review_text: reviewText,
    };

    if (editingReviewId) {
      dispatch(updateReview(editingReviewId, reviewData)); // Update existing review
    } else {
      dispatch(addReview(reviewData)); // Add new review
    }
    // Reset form fields and exit editing mode
    setRating('');
    setReviewText('');
    setEditingReviewId(null); // Exit editing mode
  };

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setRating(review.rating.toString());
    setReviewText(review.review_text);
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  return (
    <div>
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => {
              const newRating = parseInt(e.target.value, 10);
              setRating(newRating > 5 ? '5' : e.target.value);
            }}
            min="1"
            max="5"
            required
          />

        </div>
        <div>
          <label htmlFor="reviewText">Review:</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{editingReviewId ? 'Update Review' : 'Submit Review'}</button>
      </form>
      {reviews.map((review) => (
        <li key={review.id}>
          <p>{review.rating}: {review.review_text}</p>
          {review.user_id === currentUserId && (
            <>
              <button onClick={() => handleEdit(review)}>Edit</button>
              <button onClick={() => handleDelete(review.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </div>
  );
};

export default ReviewsSection;
