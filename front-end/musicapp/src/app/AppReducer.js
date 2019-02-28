import {
    LOADING_CURRENT_USER,
    LOADING_CURRENT_USER_SUCCESS,
    LOADING_CURRENT_USER_FAIL,
    LOG_OUT
} from "../constants";

var initialState = {
    authenticated: false,
    loading: false,
    currentUser: null
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CURRENT_USER:
            return {
                ...state,
                loading: true
            }
        case LOADING_CURRENT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.user,
                authenticated: true
            }
        case LOADING_CURRENT_USER_FAIL:
            return {
                ...state,
                loading: false
            }
        case LOG_OUT:
            return {
                authenticated: false,
                currentUser: null
            }
        default:
            return state;
    }
}