
import {connect} from 'react-redux';
import Signup from './Signup';
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

export default connect(mapStateToProp,mapDispatchToProp)(Signup);