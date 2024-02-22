//*====> Action Types <====
const SET_REVIEWS = 'reviews/setReviews';
const ADD_REVIEW_SUCCESS = 'reviews/addReviewSuccess';
const DELETE_REVIEW_SUCCESS = 'reviews/deleteReviewSuccess';
const UPDATE_REVIEW_SUCCESS = 'reviews/updateReviewSuccess';

//*====> Action Creators <====
const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

const addReviewSuccess = (review) => ({
  type: ADD_REVIEW_SUCCESS,
  payload: review,
});

const deleteReviewSuccess = (reviewId) => ({
  type: DELETE_REVIEW_SUCCESS,
  payload: reviewId,
});

const updateReviewSuccess = (review) => ({
  type: UPDATE_REVIEW_SUCCESS,
  payload: review,
});

//*====> Thunks <====
export const fetchReviews = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${videoId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setReviews(data));
  }
};

export const addReview = (reviewData) => async (dispatch) => {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addReviewSuccess(data));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteReviewSuccess(reviewId));
  }
};

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateReviewSuccess({ reviewId, ...data }));
  }
};

//*====> Reducers <====
const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.payload };
    case ADD_REVIEW_SUCCESS:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review.id === action.payload.reviewId ? action.payload : review
        ),
      };
    default:
      return state;
  }
};

export default reviewsReducer;
