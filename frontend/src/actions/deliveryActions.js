import axios from "axios";

export const FETCH_DELIVERY_FAILURE = "FETCH_DELIVERY_FAILURE";
export const FETCH_DELIVERY_SUCCESS = "FETCH_DELIVERY_SUCCESS";
export const FETCH_DELIVERY_REQUEST = "FETCH_DELIVERY_REQUEST";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchDeliveries = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_DELIVERY_REQUEST });
        try {
            const response = await axios.get(`${apiUrl}/api/deliveries`);
            dispatch({ type: FETCH_DELIVERY_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_DELIVERY_FAILURE, error: error.message });
        }
    };
}