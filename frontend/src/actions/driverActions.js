import axios from "axios";

export const FETCH_DRIVERS_FAILURE = "FETCH_DRIVERS_FAILURE";
export const FETCH_DRIVERS_SUCCESS = "FETCH_DRIVERS_SUCCESS";
export const FETCH_DRIVERS_REQUEST = "FETCH_DRIVERS_REQUEST";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchDrivers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DRIVERS_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/drivers`);
      dispatch({ type: FETCH_DRIVERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_DRIVERS_FAILURE, error: error.message });
    }
  };
};
