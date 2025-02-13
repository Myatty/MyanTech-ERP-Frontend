import axios from "axios";

export const FETCH_INVOICE_STATUS_FAILURE = "FETCH_INVOICE_STATUS_FAILURE";
export const FETCH_INVOICE_STATUS_SUCCESS = "FETCH_INVOICE_STATUS_SUCCESS";
export const FETCH_INVOICE_STATUS_REQUEST = "FETCH_INVOICE_STATUS_REQUEST";

export const UPDATE_INVOICE_STATUS_REQUEST = "UPDATE_INVOICE_STATUS_REQUEST";
export const UPDATE_INVOICE_STATUS_SUCCESS = "UPDATE_INVOICE_STATUS_SUCCESS";
export const UPDATE_INVOICE_STATUS_FAILURE = "UPDATE_INVOICE_STATUS_FAILURE";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchInvoice = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INVOICE_STATUS_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/invoices`);

      dispatch({ type: FETCH_INVOICE_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_INVOICE_STATUS_FAILURE, error: error.message });
    }
  };
};

export const updateInvoice = (inv) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_INVOICE_STATUS_REQUEST });
      const response = await axios.put(`${apiUrl}/api/invoices/status`, inv);
      dispatch({ type: UPDATE_INVOICE_STATUS_SUCCESS, payload: response.data });
      dispatch(fetchInvoice());
    } catch (error) {
      dispatch({ type: UPDATE_INVOICE_STATUS_FAILURE, error: error.message });
    }
  };
};
