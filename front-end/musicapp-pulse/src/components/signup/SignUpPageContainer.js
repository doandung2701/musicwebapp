import {connect} from 'react-redux';
import SignupPage from './SignUp';
import { signUp } from './SignUpAction';
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}

var mapDispatchToProp = dispatch =>{
    return {
        signUp : (signUpRequest)=>{
            dispatch(signUp(signUpRequest));
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProp)(SignupPage);