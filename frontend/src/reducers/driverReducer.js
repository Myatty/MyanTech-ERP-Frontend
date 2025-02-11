import{
    FETCH_DRIVERS_FAILURE,
    FETCH_DRIVERS_SUCCESS,
    FETCH_DRIVERS_REQUEST,  
} from  "../actions/driverActions";

const initialState = {
    loading: false,
    drivers: [],
    error: "",
}

const driverReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_DRIVERS_REQUEST:
            return { ...state, loading: true };
        case FETCH_DRIVERS_SUCCESS:
            return { loading: false, drivers: action.payload, error: "" };
        case FETCH_DRIVERS_FAILURE:
            return { loading: false, drivers: [], error: action.error };
        default:
            return state;
    }
}

export default driverReducer;