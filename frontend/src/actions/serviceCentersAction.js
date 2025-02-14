import axios from "axios";

export const FETCH_CENTER_FAILURE = "FETCH_CENTER_FAILURE";
export const FETCH_CENTER_SUCCESS = "FETCH_CENTER_SUCCESS";
export const FETCH_CENTER_REQUEST = "FETCH_CENTER_REQUEST";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchServiceCenter = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CENTER_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/serviceCenter`);

      dispatch({ type: FETCH_CENTER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_CENTER_FAILURE, error: error.message });
    }
  };
};
