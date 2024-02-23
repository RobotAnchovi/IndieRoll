//*====> Action Types <====
const ADD_CONTENT = 'content/addContent';
const FETCH_CONTENT = 'content/fetchContent';
const UPDATE_CONTENT = 'content/updateContent';
const DELETE_CONTENT = 'content/deleteContent';
const FETCH_CONTENT_BY_ID = 'content/fetchContentById';
const FETCH_CONTENT_REQUEST = 'FETCH_CONTENT_REQUEST';
const FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS';
const FETCH_CONTENT_FAILURE = 'FETCH_CONTENT_FAILURE';


//*====> Action Creators <====
const addContentAction = (content) => ({
  type: ADD_CONTENT,
  payload: content,
});

const fetchContentAction = (contents) => ({
  type: FETCH_CONTENT,
  payload: contents,
});

const updateContentAction = (content) => ({
  type: UPDATE_CONTENT,
  payload: content,
});

const deleteContentAction = (contentId) => ({
  type: DELETE_CONTENT,
  payload: contentId,
});

const fetchContentByIdAction = (content) => ({
  type: FETCH_CONTENT_BY_ID,
  payload: content,
});

const fetchContentRequest = () => ({
  type: FETCH_CONTENT_REQUEST,
});

const fetchContentSuccess = (content) => ({
  type: FETCH_CONTENT_SUCCESS,
  payload: content,
});

const fetchContentFailure = (error) => ({
  type: FETCH_CONTENT_FAILURE,
  payload: error,
});


//*====> Thunks <====
export const addNewContent = (contentData) => async (dispatch) => {
  const response = await fetch('/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contentData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addContentAction(data));
  }
};

export const fetchVideoContent = () => async (dispatch) => {
  const response = await fetch('/api/content');
  if (response.ok) {
    const data = await response.json();
    dispatch(fetchContentAction(data));
  }
};

export const updateContent = (contentId, updateData) => async (dispatch) => {
  const response = await fetch(`/api/content/${contentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateContentAction({ contentId, ...data }));
  }
};

export const deleteContent = (contentId) => async (dispatch) => {
  const response = await fetch(`/api/content/${contentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteContentAction(contentId));
  }
};

// export const fetchContentById = (contentId) => async (dispatch) => {
//   console.log('fetchContentById:', contentId);
//   const response = await fetch(`/api/content/${contentId}`);
//   console.log('fetchContentById response:', response);
//   if (response.ok) {
//     const data = await response.json();
//     console.log('Fetched content:', data);
//     dispatch(fetchContentByIdAction(data));
//   }
// };

export const fetchContentById = (contentId) => async (dispatch) => {
  dispatch(fetchContentRequest());
  try {
    const response = await fetch(`/api/content/${contentId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchContentSuccess(data));
    } else {
      throw new Error('Failed to fetch content');
    }
  } catch (error) {
    dispatch(fetchContentFailure(error.toString()));
  }
};

//*====> Reducers <====
const initialState = {
  loading: false,
  currentContent: null,
  error: '',
  contents: [],
};

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentContent: action.payload,
        error: '',
      };
    case FETCH_CONTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentContent: null,
      };
    case ADD_CONTENT:
      return { ...state, contents: [...state.contents, action.payload] };
    case FETCH_CONTENT:
      return { ...state, contents: action.payload };
    case FETCH_CONTENT_BY_ID:
      return { ...state, currentContent: action.payload };
    case UPDATE_CONTENT:
      return {
        ...state,
        contents: state.contents.map((content) =>
          content.id === action.payload.contentId ? action.payload : content
        ),
      };
    case DELETE_CONTENT:
      return {
        ...state,
        contents: state.contents.filter(
          (content) => content.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default contentReducer;
