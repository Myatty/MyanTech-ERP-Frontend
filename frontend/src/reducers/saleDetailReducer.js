import {
  FETCH_SALE_DETAIL_REQUEST,
  FETCH_SALE_DETAIL_SUCCESS,
  FETCH_SALE_DETAIL_FAILURE,
} from "../actions/saleDetailActions";
const initialState = {
  order: null,
  details: [],
  loading: false,
  error: null,
};

const saleDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SALE_DETAIL_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SALE_DETAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        order: action.payload.order,
        details: action.payload.details,
      };
    case 'FETCH_SALE_DETAIL_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default saleDetailReducer;
