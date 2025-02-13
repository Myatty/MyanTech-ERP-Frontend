import axios from "axios";

export const FETCH_CUSTOMERS_REQUEST = "FETCH_CUSTOMERS_REQUEST";
export const FETCH_CUSTOMERS_SUCCESS = "FETCH_CUSTOMERS_SUCCESS";
export const FETCH_CUSTOMERS_FAILURE = "FETCH_CUSTOMERS_FAILURE";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMERS_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/customers`);
      dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_CUSTOMERS_FAILURE, error: error.message });
    }
  };
};
