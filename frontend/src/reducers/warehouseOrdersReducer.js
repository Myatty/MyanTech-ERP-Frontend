import {
  FETCH_WAREHOUSE_ORDERS_REQUEST,
  FETCH_WAREHOUSE_ORDERS_SUCCESS,
  FETCH_WAREHOUSE_ORDERS_FAILURE,
} from "../actions/warehouseOrderActions";

  const initialState = {
    loading: false,
    warehouseOrders: [],
    error: "",
  };

const warehouseOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WAREHOUSE_ORDERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_WAREHOUSE_ORDERS_SUCCESS:
      return { loading: false, warehouseOrders: action.payload, error: "" };
    case FETCH_WAREHOUSE_ORDERS_FAILURE:
      return { loading: false, warehouseOrders: [], error: action.error };
    default:
      return state;
  }
};

export default warehouseOrdersReducer;
