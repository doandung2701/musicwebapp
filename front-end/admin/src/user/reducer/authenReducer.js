import {
    LOADING_CURRENT_USER,
    LOADING_CURRENT_USER_SUCCESS,
    LOADING_CURRENT_USER_FAIL,
    LOG_OUT,
    LOGINING,
    LOGIN_SUCCESSFULLY
} from "../../constants";
import Alert from 'react-s-alert'

var initialState={
    loading:false,
    currentUser:null,
    authenticated:false,
    loginfalse:null,
    error:false
}
export const authenReducer=(state=initialState,action)=>{
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
        default:
            return state;
    }
}