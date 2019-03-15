
import {connect} from 'react-redux';
import Login from "./Login";
import { loginUser } from './LoginAction';
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

export default connect(mapStateToProp,mapDispatchToProps)(Login);