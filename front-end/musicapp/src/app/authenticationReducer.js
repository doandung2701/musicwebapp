import {
    LOADING_CURRENT_USER,
    LOADING_CURRENT_USER_SUCCESS,
    LOADING_CURRENT_USER_FAIL,
    LOG_OUT,
    LOGINING,
    SIGNING_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    LOGIN_SUCCESSFULLY
} from "../constants";
import Alert from 'react-s-alert'

var initialState = {
    authenticated: false,
    loading: false,
    currentUser: null,
    isSigningUp: false
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
                ...state,
                authenticated: false,
                currentUser: null
            }
        case LOGIN_SUCCESSFULLY: 
        Alert.success("You're successfully logged in!");

            return {
                ...state,
                authenticated: true
            }
        
        case SIGNING_UP: 
            return {
                ...state,
                isSigningUp: true
            }
        case SIGN_UP_SUCCESS:
        case SIGN_UP_FAIL:
            return {
                ...state,
                isSigningUp: false
            }
        default:
            return state;
    }
}