import { LOGIN_SUCCESSFULLY, LOGIN_FAILED, LOGINING, ACCESS_TOKEN } from "../../constants";
import { login } from '../../util/APIUtils';
import Alert from 'react-s-alert';

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
            dispatch(loginSuccessFully())
            Alert.success("You're successfully logged in!");
            this.props.history.push("/");
        }).catch(error => {
            dispatch(loginFailed)
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
}