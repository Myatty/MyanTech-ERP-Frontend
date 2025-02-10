import axios from "axios";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
      const response = await axios.get("http://localhost:4000/api/orders");
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ORDERS_FAILURE, error: error.message });
    }
  };
};
