import axios from "axios";

export const FETCH_TRUCKS_REQUEST = "FETCH_TRUCKS_REQUEST";
export const FETCH_TRUCKS_SUCCESS = "FETCH_TRUCKS_SUCCESS";
export const FETCH_TRUCKS_FAILURE = "FETCH_TRUCKS_FAILURE";

export const fetchTrucks = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRUCKS_REQUEST });
    try {
      const response = await axios.get("http://localhost:4000/api/trucks");
      console.log(`trucks: ${response.data}`);
      dispatch({ type: FETCH_TRUCKS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_TRUCKS_FAILURE, error: error.message });
    }
  };
};