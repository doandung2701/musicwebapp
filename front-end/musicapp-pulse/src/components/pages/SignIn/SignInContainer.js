
import {connect} from 'react-redux';
import { loginUser } from './SignInAction';
import SigninPage from './SignIn';
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}

var mapDispatchToProps = dispatch =>{
    return {
        login: (loginRequest)=>{
            dispatch(loginUser(loginRequest))
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(SigninPage);