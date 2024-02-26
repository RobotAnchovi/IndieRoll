//*====> Action Types <====
const ADD_CONTENT = 'content/addContent';
const FETCH_CONTENT = 'content/fetchContent';
const FETCH_USER_CONTENTS = 'content/fetchUserContent';
const UPDATE_CONTENT = 'content/updateContent';
const DELETE_CONTENT = 'content/deleteContent';
const FETCH_CONTENT_BY_GENRE = 'content/fetchContentByGenre';
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
// const fetchUserContentsAction = (contents) => ({
//   type: FETCH_USER_CONTENTS,
//   payload: contents,
// });

const fetchContentByGenreAction = (genreName, contents) => ({
  type: FETCH_CONTENT_BY_GENRE,
  payload: { genreName, contents },
});

const updateContentAction = (content) => ({
  type: UPDATE_CONTENT,
  payload: content,
});

const deleteContentAction = (contentId) => ({
  type: DELETE_CONTENT,
  payload: contentId,
});

// const fetchContentByIdAction = (content) => ({
//   type: FETCH_CONTENT_BY_ID,
//   payload: content,
// });

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
export const addNewContent = (formData) => async (dispatch) => {
  const response = await fetch('/api/content', {
    method: 'POST',
    body: formData, // Directly use the FormData passed from the form
    // Do not explicitly set 'Content-Type'. Let the browser handle it to properly set the multipart boundary.
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addContentAction(data));
    return data.id;
  } else {
    // Handle errors or invalid responses. Consider enhancing error handling based on your app's needs.
    const error = await response.json();
    console.error('Failed to upload content:', error);
  }
};

export const fetchVideoContent = () => async (dispatch) => {
  const response = await fetch('/api/content');
  if (response.ok) {
    const data = await response.json();
    dispatch(fetchContentAction(data));
  }
};

// export const fetchUserContents = (userId) => async (dispatch) => {
//   const response = await fetch(`/api/content/user/${userId}`);

//     if (response.ok) {
//       const contents = await response.json();
//       dispatch(fetchUserContentsAction(contents));
//     } else {
//       throw response;
//     }
// };

export const fetchContentByGenre = (genreName) => async (dispatch, getState) => {

  if (getState().content.contents.length === 0) {
    await dispatch(fetchVideoContent());
  }

  const allContents = getState().content.contents;
  const filteredContents = allContents.filter(content =>
    content.genre.toLowerCase() === genreName.toLowerCase().replace(/-/g, ' ')
  );

  dispatch(fetchContentByGenreAction(genreName, filteredContents));
};

export const updateContent = (contentId, updateData, newThumbnail, newVideo, thumbnailPreview, videoPreview) => async (dispatch) => {
  const formData = new FormData();

  formData.append('title', updateData.title);
  formData.append('description', updateData.description);
  formData.append('genre', updateData.genre);

  if (!newThumbnail) {
    formData.append('thumbnail_url', thumbnailPreview);
} else {
    formData.append('thumbnail', newThumbnail);
}

if (!newVideo) {
    formData.append('video_url', videoPreview);
} else {
    formData.append('video', newVideo);
}

  const response = await fetch(`/api/content/${contentId}`, {
    method: 'PUT',
    body: formData,
  });

  if (response.ok) {
    const updatedContent = await response.json();
    dispatch(updateContentAction({ contentId, ...updatedContent }));
    return { success: true };
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
  genreContents: {},
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
    case FETCH_USER_CONTENTS:
      return { ...state, contents: action.payload };
    case FETCH_CONTENT_BY_GENRE:
      return {
        ...state,
        genreContents: {
          ...state.genreContents,
          [action.payload.genreName]: action.payload.contents,
        },
      };
    case FETCH_CONTENT_BY_ID:
      return { ...state, currentContent: action.payload };
    case UPDATE_CONTENT:
      return {
        ...state,
        contents: state.contents.map((content) =>
          content.id === action.payload.contentId ? { ...content, ...action.payload } : content
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
