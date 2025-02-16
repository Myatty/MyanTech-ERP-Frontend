import axios from "axios";

export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
const apiUrl = import.meta.env.VITE_APP_API_URL;
console.log("API URL:", apiUrl); // <-- check if the URL is correct
// Action for login
// authActions.js
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    console.log("Response data:", response.data); // <-- see exactly what the server sends

    const { jwt, message } = response.data;

    if (!jwt) {
      // If `success` is false or missing, dispatch an error
      dispatch({
        type: AUTH_LOGIN_FAILURE,
        error: message || "Invalid credentials",
      });
      return;
    }

    // Otherwise, success scenario
    localStorage.setItem("authToken", jwt);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: jwt });
  } catch (error) {
    // Only for real HTTP errors (4xx/5xx)
    dispatch({
      type: AUTH_LOGIN_FAILURE,
      error: error.message,
    });
  }
};

export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("authToken");
  // Dispatch a logout action
  dispatch({ type: AUTH_LOGOUT });
};
