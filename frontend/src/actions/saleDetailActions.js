import axios from "axios";

export const FETCH_SALE_DETAIL_REQUEST = "FETCH_SALE_DETAIL_REQUEST";
export const FETCH_SALE_DETAIL_SUCCESS = "FETCH_SALE_DETAIL_SUCCESS";
export const FETCH_SALE_DETAIL_FAILURE = "FETCH_SALE_DETAIL_FAILURE";
const apiUrl = import.meta.env.VITE_APP_API_URL;


export const fetchSaleDetail = (order_id) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_SALE_DETAIL_REQUEST });
        try {
            const response = await axios.get(`${apiUrl}/api/orders/${order_id}`);
            dispatch({ type: FETCH_SALE_DETAIL_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_SALE_DETAIL_FAILURE, error: error.message });
        }
    };
};