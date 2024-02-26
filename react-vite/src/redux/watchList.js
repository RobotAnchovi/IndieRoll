//*====> Action Types <====
const ADD_WATCHLIST_ITEM = 'watchlist/addWatchlistItem';
const SET_WATCHLIST = 'watchlist/setWatchlist';
const REMOVE_WATCHLIST_ITEM = 'watchlist/removeWatchlistItem';

//*====> Action Creators <====
const addWatchlistItem = (item) => ({
  type: ADD_WATCHLIST_ITEM,
  payload: item,
});

const setWatchlist = (watchlist) => ({
  type: SET_WATCHLIST,
  payload: watchlist,
});

const removeWatchlistItem = (watchlistId) => ({
  type: REMOVE_WATCHLIST_ITEM,
  payload: watchlistId,
});

//*====> Thunks <====
export const addToWatchlist = (videoId) => async (dispatch) => {
  const response = await fetch('/api/watchlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ video_id: videoId }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addWatchlistItem(data));
  }
};

export const fetchUserWatchlist = () => async (dispatch) => {
  const response = await fetch('/api/watchlist', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setWatchlist(data));
  }
};

export const removeFromWatchlist = (watchlistId) => async (dispatch) => {
  const response = await fetch(`/api/watchlist/${watchlistId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    dispatch(removeWatchlistItem(watchlistId));
  }
};

//*====> Reducers <====
const initialState = {
  watchlist: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WATCHLIST:
      return { ...state, watchlist: action.payload };
    case ADD_WATCHLIST_ITEM:
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case REMOVE_WATCHLIST_ITEM:
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.watchlist_id !== action.payload),
      };

    default:
      return state;
  }
};

export default watchlistReducer;
