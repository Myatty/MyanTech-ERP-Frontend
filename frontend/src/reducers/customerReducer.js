import {
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_FAILURE,
} from "../actions/customerActions";

const initialState = {
  loading: false,
  customers: [],
  error: "",
};

const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CUSTOMERS_SUCCESS:
      return { loading: false, customers: action.payload, error: "" };
    case FETCH_CUSTOMERS_FAILURE:
      return { loading: false, customers: [], error: action.error };
    default:
      return state;
  }
};

export default customersReducer;
