import { login, getCurrentUser } from '../util/APIUtils';
import Alert from 'react-s-alert';
import { LOADING_CURRENT_USER, LOADING_CURRENT_USER_SUCCESS, LOADING_CURRENT_USER_FAIL, LOG_OUT, LOGINING, LOGIN_SUCCESSFULLY, LOGIN_FAILED, ACCESS_TOKEN } from "../constants";
import { history } from '../util/Helpers';

export const loggingIn = ()=>({
    type: LOGINING
})

export const loginSuccessFully=()=>({
    type: LOGIN_SUCCESSFULLY
})

export const loginFailed = ()=>({
    type: LOGIN_FAILED
})
export const loadingCurrentUser = () => ({
    type: LOADING_CURRENT_USER
})

export const loadCurrentUserSuccess = (user) => ({
    type: LOADING_CURRENT_USER_SUCCESS,
    user
})

export const loadCurrentUserFail = (error) => ({
    type: LOADING_CURRENT_USER_FAIL,
    error
})

export const loadCurrentUser = () => {
    return dispatch => {
        dispatch(loadingCurrentUser());
        getCurrentUser()
            .then(response => {
                dispatch(loadCurrentUserSuccess(response))
            }).catch(error => {
                dispatch(loadCurrentUserFail(error))
            });
    }
}

export const logout = ()=>{
    Alert.closeAll();
    localStorage.removeItem(ACCESS_TOKEN);
    Alert.success("You're safely logged out!");
    return {
        type: LOG_OUT
    }
}
export const loginUser = (loginRequest)=>{
    return dispatch=>{
        dispatch(loggingIn());
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            dispatch(loginSuccessFully());
            dispatch(loadCurrentUser());
            history.push("/");
        }).catch(error => {
            dispatch(loginFailed)
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
}