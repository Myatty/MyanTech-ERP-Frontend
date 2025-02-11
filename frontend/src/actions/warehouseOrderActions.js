import axios from "axios";

export const FETCH_WAREHOUSE_ORDERS_REQUEST = "FETCH_WAREHOUSE_ORDERS_REQUEST";
export const FETCH_WAREHOUSE_ORDERS_SUCCESS = "FETCH_WAREHOUSE_ORDERS_SUCCESS";
export const FETCH_WAREHOUSE_ORDERS_FAILURE = "FETCH_WAREHOUSE_ORDERS_FAILURE";

export const fetchWarehouseOrders = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WAREHOUSE_ORDERS_REQUEST });
    try {
      const response = await axios.get("http://localhost:4000/api/orders/warehouse");
      console.log(response.data);
      dispatch({ type: FETCH_WAREHOUSE_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_WAREHOUSE_ORDERS_FAILURE, error: error.message });
    }
  };
};
