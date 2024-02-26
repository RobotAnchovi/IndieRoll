const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_USER = 'session/updateUser'; // dwayne's addition

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

// dwayne's addition
const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});


export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
    credentials: 'include',
  });
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

// dwayne's addition
export const thunkUpdateUserProfile = (userData, profilePicture) => async dispatch => {
  const formData = new FormData();
  formData.append('username', userData.username);
  formData.append('user_intro', userData.user_intro);
  if (profilePicture) {
    formData.append('profile_picture', profilePicture);
  }

  const response = await fetch("/api/users/update", {
    method: "PUT",
    body: formData,
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(updateUser(data));
    return true;
  } else {
    const errorMessages = await response.json();
    return errorMessages;
  }
};


const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case UPDATE_USER: // dwayne's addition
      return { ...state, user: action.payload }; // dwayne's addition
    default:
      return state;
  }
}

export default sessionReducer;
