import {
    FETCH_TRUCKS_REQUEST,
    FETCH_TRUCKS_SUCCESS,
    FETCH_TRUCKS_FAILURE,
} from "../actions/truckActions";


const initialState = {
    loading: false,
    trucks: [],
    error: "",
  };
  
  
  const truckReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRUCKS_REQUEST:
        return { ...state, loading: true };
      case FETCH_TRUCKS_SUCCESS:
        return { loading: false, trucks: action.payload, error: "" };
      case FETCH_TRUCKS_FAILURE:
        return { loading: false, trucks: [], error: action.error };
      default:
        return state;
    }
  };
  
  export default truckReducer;
  