import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviews,
  addReview,
  deleteReview,
  updateReview,
} from "../../redux/reviews";
import "./ReviewsSection.css";

const ReviewsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const currentUserId = useSelector((state) => state.session.user.id);

  // Form state
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);

  // useEffect(() => {
  //   if (reviews.length === 0) {
  //     dispatch(fetchReviews(id));
  //   }
  // }, [id, reviews.length, dispatch]);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [id, dispatch]);


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
    setRating("");
    setReviewText("");
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
    <div className="reviews-container">
    <div className="reviews-section">
      <h2>What&apos;d you think of the film?</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="rating" className="form-label">Rating</label>
          {/* Here you might use a star rating component instead of a number input */}
          <input
            type="number"
            id="rating"
            className="form-rating"
            value={rating}
            onChange={(e) => {
              const newRating = parseInt(e.target.value, 10);
              setRating(newRating > 5 ? 5 : e.target.value); // Ensure rating does not exceed 5
            }}
            min="1"
            max="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reviewText" className="form-label">Review</label>
          <textarea
            id="reviewText"
            className="form-textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {editingReviewId ? "Update" : "Submit"}
        </button>
      </form>
      <ul className="reviews-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            {/* Render star ratings based on review.rating */}
            <div className="rating-stars">
              {/* Placeholder for star rating: render a star component or divs here */}
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </div>
            <p className="review-text">{review.review_text}</p>
            {review.user_id === currentUserId && (
              <div className="review-actions">
                <button onClick={() => handleEdit(review)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(review.id)} className="delete-button">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};
export default ReviewsSection;
