import axios from "axios";

export const CREATE_INVOICE_REQUEST = "CREATE_INVOICE_REQUEST";
export const CREATE_INVOICE_SUCCESS = "CREATE_INVOICE_SUCCESS";
export const CREATE_INVOICE_FAILURE = "CREATE_INVOICE_FAILURE";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const createInvoice = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INVOICE_REQUEST });

    try {
      const response = await axios.post(`${apiUrl}/api/invoices/${orderId}`);

      dispatch({
        type: CREATE_INVOICE_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: CREATE_INVOICE_FAILURE,
        error: error.response ? error.response.data.message : error.message,
      });

      throw error;
    }
  };
};
