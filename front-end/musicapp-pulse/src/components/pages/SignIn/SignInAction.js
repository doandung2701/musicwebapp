import Alert from 'react-s-alert';
import { LOGINING, LOGIN_SUCCESSFULLY, LOGIN_FAILED, ACCESS_TOKEN } from '../../../constants/constants';
import { login } from '../../../Api/UserApi';
import { loadCurrentUser } from '../../../actions/AuthentcationAction';
import { history } from '../../../helpers/helper';

export const loggingIn = ()=>({
    type: LOGINING
})

export const loginSuccessFully=()=>({
    type: LOGIN_SUCCESSFULLY
})

export const loginFailed = ()=>({
    type: LOGIN_FAILED
})

export const loginUser = (loginRequest)=>{
    return dispatch=>{
        dispatch(loggingIn());
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            dispatch(loginSuccessFully());
            dispatch(loadCurrentUser());
            // history.push("/user-profile");
        }).catch(error => {
            dispatch(loginFailed())
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
}