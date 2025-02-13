import axios from "axios";

export const FETCH_WAREHOUSE_ORDERS_REQUEST = "FETCH_WAREHOUSE_ORDERS_REQUEST";
export const FETCH_WAREHOUSE_ORDERS_SUCCESS = "FETCH_WAREHOUSE_ORDERS_SUCCESS";
export const FETCH_WAREHOUSE_ORDERS_FAILURE = "FETCH_WAREHOUSE_ORDERS_FAILURE";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchWarehouseOrders = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WAREHOUSE_ORDERS_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/orders/warehouse`);
      dispatch({ type: FETCH_WAREHOUSE_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_WAREHOUSE_ORDERS_FAILURE, error: error.message });
    }
  };
};
