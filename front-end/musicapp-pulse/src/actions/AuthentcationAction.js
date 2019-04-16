
import Alert from 'react-s-alert';
import { LOADING_CURRENT_USER, LOADING_CURRENT_USER_SUCCESS, LOADING_CURRENT_USER_FAIL, LOG_OUT, ACCESS_TOKEN } from '../constants/constants';
import { getCurrentUser } from '../Api/UserApi';

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