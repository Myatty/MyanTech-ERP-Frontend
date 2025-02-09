import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
} from "../actions/userActions";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { loading: false, users: action.payload, error: "" };
    case FETCH_USERS_FAILURE:
      return { loading: false, users: [], error: action.error };
    default:
      return state;
  }
};

export default usersReducer;
