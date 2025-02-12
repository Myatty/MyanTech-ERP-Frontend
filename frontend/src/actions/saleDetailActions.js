import axios from "axios";

export const FETCH_SALE_DETAIL_REQUEST = "FETCH_SALE_DETAIL_REQUEST";
export const FETCH_SALE_DETAIL_SUCCESS = "FETCH_SALE_DETAIL_SUCCESS";
export const FETCH_SALE_DETAIL_FAILURE = "FETCH_SALE_DETAIL_FAILURE";

export const fetchSaleDetail = (order_id) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_SALE_DETAIL_REQUEST });
        try {
            const response = await axios.get(`http://localhost:4000/api/orders/${order_id}`);
            console.log(`sale details : ${response.data}`);
            dispatch({ type: FETCH_SALE_DETAIL_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_SALE_DETAIL_FAILURE, error: error.message });
        }
    };
};