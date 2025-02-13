import axios from "axios";

export const FETCH_RETURN_FAILURE = "FETCH_RETURN_FAILURE";
export const FETCH_RETURN_SUCCESS = "FETCH_RETURN_SUCCESS";
export const FETCH_RETURN_REQUEST = "FETCH_RETURN_REQUEST";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchReturnOrder = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_RETURN_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/`);

      dispatch({ type: FETCH_RETURN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_RETURN_FAILURE, error: error.message });
    }
  };
};
