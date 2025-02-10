import axios from "axios";

export const FETCH_CUSTOMERS_REQUEST = "FETCH_CUSTOMERS_REQUEST";
export const FETCH_CUSTOMERS_SUCCESS = "FETCH_CUSTOMERS_SUCCESS";
export const FETCH_CUSTOMERS_FAILURE = "FETCH_CUSTOMERS_FAILURE";

export const fetchCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMERS_REQUEST });
    try {
      const response = await axios.get("http://localhost:4000/api/customers");
      console.log("API Response:", response.data);
      dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_CUSTOMERS_FAILURE, error: error.message });
    }
  };
};
