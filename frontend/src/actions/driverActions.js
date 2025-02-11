import axios from "axios";

export const FETCH_DRIVERS_FAILURE = "FETCH_DRIVERS_FAILURE";
export const FETCH_DRIVERS_SUCCESS = "FETCH_DRIVERS_SUCCESS";
export const FETCH_DRIVERS_REQUEST = "FETCH_DRIVERS_REQUEST";

export const fetchDrivers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DRIVERS_REQUEST });
    try {
      const response = await axios.get("http://localhost:4000/api/drivers");
      console.log(`response.data`, response.data);
      
      console.log(response.data);
      dispatch({ type: FETCH_DRIVERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_DRIVERS_FAILURE, error: error.message });
    }
  };
};
