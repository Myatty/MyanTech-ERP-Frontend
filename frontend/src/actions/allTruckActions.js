import axios from "axios";

export const FETCH_ALL_TRUCKS_FAILURE = "FETCH_ALL_TRUCKS_FAILURE";
export const FETCH_ALL_TRUCKS_SUCCESS = "FETCH_ALL_TRUCKS_SUCCESS";
export const FETCH_ALL_TRUCKS_REQUEST = "FETCH_ALL_TRUCKS_REQUEST";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchAllTrucks = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ALL_TRUCKS_REQUEST });
        try {
            const response = await axios.get(`${apiUrl}/api/trucks/all`);
            dispatch({ type: FETCH_ALL_TRUCKS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_ALL_TRUCKS_FAILURE, error: error.message });
        }
    };
}