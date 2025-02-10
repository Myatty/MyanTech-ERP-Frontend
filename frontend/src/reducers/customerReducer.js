import{
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_FAILURE,
} from '../actions/customerActions';


const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CUSTOMERS_SUCCESS:
      return { loading: false, orders: action.payload, error: "" };
    case FETCH_CUSTOMERS_FAILURE:
      return { loading: false, orders: [], error: action.error };
    default:
      return state;
  }
};

export default customersReducer;
