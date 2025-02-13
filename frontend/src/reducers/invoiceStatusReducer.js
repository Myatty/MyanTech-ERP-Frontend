import {
  FETCH_INVOICE_STATUS_FAILURE,
  FETCH_INVOICE_STATUS_REQUEST,
  FETCH_INVOICE_STATUS_SUCCESS,
} from "../actions/invoiceStatusAction";

const initialState = {
  loading: false,
  invoices: [],
  error: "",
};

const invoicesStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICE_STATUS_REQUEST:
      return { ...state, loading: true };
    case FETCH_INVOICE_STATUS_SUCCESS:
      return { loading: false, invoices: action.payload, error: "" };
    case FETCH_INVOICE_STATUS_FAILURE:
      return { loading: false, invoices: [], error: action.error };
    default:
      return state;
  }
};

export default invoicesStatusReducer;
