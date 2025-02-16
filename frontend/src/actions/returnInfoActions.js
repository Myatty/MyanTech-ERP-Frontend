import axios from "axios";

export const FETCH_RETURN_INFO_SUCCESS = "FETCH_RETURN_INFO_SUCCESS";
export const FETCH_RETURN_INFO_REQUEST = "FETCH_RETURN_INFO_REQUEST";
export const FETCH_RETURN_INFO_FAILURE = "FETCH_RETURN_INFO_FAILURE";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchReturnInfo = (order_id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_RETURN_INFO_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/returns/joined`);

      dispatch({ type: FETCH_RETURN_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_RETURN_INFO_FAILURE, error: error.message });
    }
  };
};
