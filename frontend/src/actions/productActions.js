import axios from "axios";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, error: error.message });
    }
  };
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const response = await axios.post(
      `${apiUrl}/api/products`,
      productData
    );

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });

    return true; 
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || "Failed to create product",
    });

    return false; 
  }
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const response = await axios.put(`${apiUrl}/api/products/${product.product_id || product.id}`, product);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
      dispatch(fetchProducts());
    } catch (error) {
      dispatch({ type: UPDATE_PRODUCT_FAILURE, error: error.message });
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      await axios.delete(`${apiUrl}/api/products/${productId}`);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
      dispatch(fetchProducts());
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAILURE, error: error.message });
    }
  };
};