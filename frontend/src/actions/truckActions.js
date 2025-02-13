import axios from "axios";

export const FETCH_TRUCKS_REQUEST = "FETCH_TRUCKS_REQUEST";
export const FETCH_TRUCKS_SUCCESS = "FETCH_TRUCKS_SUCCESS";
export const FETCH_TRUCKS_FAILURE = "FETCH_TRUCKS_FAILURE";
const apiUrl = import.meta.env.VITE_APP_API_URL;


export const fetchTrucks = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRUCKS_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/trucks`);
      dispatch({ type: FETCH_TRUCKS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_TRUCKS_FAILURE, error: error.message });
    }
  };
};