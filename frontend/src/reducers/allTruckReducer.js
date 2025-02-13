const initialState = {
  allTrucks: [],
  loading: false,
  error: null,
};

const allTruckReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_TRUCKS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ALL_TRUCKS_SUCCESS":
      return { ...state, loading: false, allTrucks: action.payload };
    case "FETCH_ALL_TRUCKS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default allTruckReducer;
