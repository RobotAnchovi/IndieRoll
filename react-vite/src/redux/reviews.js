// //*====> Action Types <====
const SET_REVIEWS = 'reviews/setReviews';
const ADD_REVIEW_SUCCESS = 'reviews/addReviewSuccess';
const DELETE_REVIEW_SUCCESS = 'reviews/deleteReviewSuccess';
const UPDATE_REVIEW_SUCCESS = 'reviews/updateReviewSuccess';
// Action Types
const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

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

// Action Creators
const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
});

const fetchReviewsSuccess = reviews => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: reviews,
});

const fetchReviewsFailure = error => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: error,
});

// //*====> Thunks <====
// export const fetchReviews = (videoId) => async (dispatch) => {
//   console.log('fetchReviews:', videoId);
//   const response = await fetch(`/api/reviews/${videoId}`);
//   console.log('fetchReviews response:', response);
//   if (response.ok) {
//     const data = await response.json();
//     console.log('Fetched reviews:', data);
//     dispatch(setReviews(data));
//   }
// };

// Thunk Action Creator
export const fetchReviews = videoId => {
  return async dispatch => {
    dispatch(fetchReviewsRequest());
    try {
      // Make sure your request URL is correct and matches your server's endpoint
      const response = await fetch(`/api/reviews/${videoId}`);
      if (response.ok) {
        const data = await response.json(); // Parse JSON body of the response
        console.log('Fetched reviews:', data);
        dispatch(fetchReviewsSuccess(data)); // Dispatch success action with the parsed data
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      dispatch(fetchReviewsFailure(error.toString())); // Handle any errors
    }
  };
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
// const initialState = {
//   reviews: [],
// };

// Reducer
const initialState = {
  loading: false,
  reviews: [],
  error: '',
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_REVIEWS_REQUEST:
          return {
            ...state,
            loading: true,
          };
      case FETCH_REVIEWS_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
          error: '',
        };
      case FETCH_REVIEWS_FAILURE:
        return {
          loading: false,
          reviews: [],
          error: action.payload,
        };
    case SET_REVIEWS:
      console.log('action.payload:', action.payload)
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







