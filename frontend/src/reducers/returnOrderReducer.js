import {
  FETCH_RETURN_FAILURE,
  FETCH_RETURN_REQUEST,
  FETCH_RETURN_SUCCESS,
} from "../actions/returnOrderAction";

const initialState = {
  loading: false,
  returnOrders: [],
  error: "",
};

const returnOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RETURN_REQUEST:
      return { ...state, loading: true };
    case FETCH_RETURN_SUCCESS:
      return { loading: false, returnOrders: action.payload, error: "" };
    case FETCH_RETURN_FAILURE:
      return { loading: false, returnOrders: [], error: action.error };
    default:
      return state;
  }
};

export default returnOrderReducer;
