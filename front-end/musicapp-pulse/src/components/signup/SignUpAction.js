import Alert from 'react-s-alert';
import { SIGNING_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from '../../constants/constants';
import { signup } from '../../Api/UserApi';
import { history } from '../../helpers/helper';

const signingUp = ()=>({
    type: SIGNING_UP
})

const signupSuccess = (data)=>{
    return {
        type: SIGN_UP_SUCCESS,
        data
    }
}

const signupFail = (error)=>({
    type: SIGN_UP_FAIL,
    error
})

export const signUp = (signupRequest)=>{
    return dispatch=>{
        dispatch(signingUp());
        signup(signupRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            dispatch(signupSuccess(response.data))
           history.push("/signin");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            dispatch(signupFail(error.message));            
        });
    }
}