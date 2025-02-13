import {
  FETCH_CENTER_FAILURE,
  FETCH_CENTER_REQUEST,
  FETCH_CENTER_SUCCESS,
} from "../actions/serviceCentersAction";

const initialState = {
  loading: false,
  serviceCenters: [],
  error: "",
};

const serviceCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CENTER_REQUEST:
      return { ...state, loading: true };
    case FETCH_CENTER_SUCCESS:
      return { loading: false, serviceCenters: action.payload, error: "" };
    case FETCH_CENTER_FAILURE:
      return { loading: false, serviceCenters: [], error: action.error };
    default:
      return state;
  }
};

export default serviceCenterReducer;
