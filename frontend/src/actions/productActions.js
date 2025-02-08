// filepath: /d:/Programming Repos/MyanTech ERP/frontend/src/actions/productActions.js
import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, error: error.message });
    }
  };
};