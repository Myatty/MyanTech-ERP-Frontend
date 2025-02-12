import axios from "axios";

export const FETCH_ALL_DRIVERS_FAILURE = "FETCH_ALL_DRIVERS_FAILURE";
export const FETCH_ALL_DRIVERS_SUCCESS = "FETCH_ALL_DRIVERS_SUCCESS";
export const FETCH_ALL_DRIVERS_REQUEST = "FETCH_ALL_DRIVERS_REQUEST";

export const fetchAllDrivers = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ALL_DRIVERS_REQUEST });
        try {
            const response = await axios.get("http://localhost:4000/api/drivers/all");
            console.log(`response.data`, response.data);

            dispatch({ type: FETCH_ALL_DRIVERS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_ALL_DRIVERS_FAILURE, error: error.message });
        }
    };
}