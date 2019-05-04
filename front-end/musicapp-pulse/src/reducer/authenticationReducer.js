
import Alert from 'react-s-alert'
import { LOADING_CURRENT_USER, LOADING_CURRENT_USER_SUCCESS, LOADING_CURRENT_USER_FAIL, LOG_OUT, LOGIN_SUCCESSFULLY, SIGNING_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL, UPLOADING_AVA, UPLOAD_AVA_SUCCESS, UPLOAD_AVA_FAIL } from '../constants/constants';
var initialState = {
    authenticated: localStorage.getItem("accessToken") ? true : false,
    loading: false,
    currentUser: undefined,
    isUploadingAva: false,
    isSigningUp: false
}
export const authenticateReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOADING_AVA:
            return {
                ...state,
                isUploadingAva: true
            }
        case UPLOAD_AVA_SUCCESS:
            return {
                ...state,
                isUploadingAva: false,
                currentUser: {
                    ...state.currentUser,
                    imageUrl: action.data
                }
            }
        case UPLOAD_AVA_FAIL:
            return {
                ...state,
                isUploadingAva: false
            }
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
                currentUser: undefined
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