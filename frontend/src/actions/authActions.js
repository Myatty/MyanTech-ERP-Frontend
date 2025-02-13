import axios from "axios";

export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";

// Action for login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });

  try {
    // Send login request
    const response = await axios.post("http://localhost:4000/auth/login", {
      email,
      password,
    });

    // Save the token in Redux and localStorage
    const { jwt } = response.data;
    localStorage.setItem("authToken", jwt); // Save token to localStorage

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: jwt,
    });
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
      error: error.message,
    });
  }
};
