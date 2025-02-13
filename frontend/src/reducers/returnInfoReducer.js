import {
    FETCH_RETURN_INFO_FAILURE,
    FETCH_RETURN_INFO_SUCCESS,
    FETCH_RETURN_INFO_REQUEST
    } from "../actions/returnInfoActions";

const initialState = {
    loading: false,
    returnInfo: [],
    error: "",
}

const returnInfoReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_RETURN_INFO_REQUEST:
            return { ...state, loading: true };
        case FETCH_RETURN_INFO_SUCCESS:
            return { loading: false, returnInfo: action.payload, error: "" };
        case FETCH_RETURN_INFO_FAILURE:
            return { loading: false, returnInfo: [], error: action.error };
        default:
            return state;
    }
}

export default returnInfoReducer;