import{
    FETCH_DELIVERY_FAILURE,
    FETCH_DELIVERY_SUCCESS,
    FETCH_DELIVERY_REQUEST,  
} from  "../actions/deliveryActions";

const initialState = {
    loading: false,
    deliveries: [],
    error: "",
}

const deliveryReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_DELIVERY_REQUEST:
            return { ...state, loading: true };
        case FETCH_DELIVERY_SUCCESS:
            return { loading: false, deliveries: action.payload, error: "" };
        case FETCH_DELIVERY_FAILURE:
            return { loading: false, deliveries: [], error: action.error };
        default:
            return state;
    }
}

export default deliveryReducer;