const initialState = {
  allDrivers: [],
  loading: false,
  error: null,
};

const allDriverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_DRIVERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_ALL_DRIVERS_SUCCESS':
      return { ...state, loading: false, allDrivers: action.payload };
    case 'FETCH_ALL_DRIVERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default allDriverReducer;