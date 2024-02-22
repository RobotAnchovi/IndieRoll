//*====> Action Types <====
const ADD_CONTENT = 'content/addContent';
const FETCH_CONTENT = 'content/fetchContent';
const FETCH_USER_CONTENTS = 'content/fetchUserContent'
const UPDATE_CONTENT = 'content/updateContent';
const DELETE_CONTENT = 'content/deleteContent';

//*====> Action Creators <====
const addContentAction = (content) => ({
  type: ADD_CONTENT,
  payload: content,
});

const fetchContentAction = (contents) => ({
  type: FETCH_CONTENT,
  payload: contents,
});
const fetchUserContentsAction = (contents) => ({
  type: FETCH_USER_CONTENTS,
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

export const fetchUserContents = (userId) => async (dispatch) => {
    const response = await fetch(`/api/content/user/${userId}`);

    if (response.ok) {
      const contents = await response.json();
      dispatch(fetchUserContentsAction(contents));
    } else {
      throw response;
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

//*====> Reducers <====
const contentReducer = (state = { contents: [] }, action) => {
  switch (action.type) {
    case ADD_CONTENT:
      return { ...state, contents: [...state.contents, action.payload] };
    case FETCH_CONTENT:
      return { ...state, contents: action.payload };
      case FETCH_USER_CONTENTS:
        return { ...state, contents: action.payload };
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
