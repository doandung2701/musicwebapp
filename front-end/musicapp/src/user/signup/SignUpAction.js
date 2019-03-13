import { SIGNING_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../../constants";
import { signup } from "../../util/APIUtils";
import Alert from 'react-s-alert';

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
            console.log(response);
            dispatch(signupSuccess(response.data))
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            dispatch(signupFail(error.message));            
        });
    }
}