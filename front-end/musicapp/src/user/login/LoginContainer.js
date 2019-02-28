
import {connect} from 'react-redux';
import Login from "./Login";
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}

export default connect(mapStateToProp,null)(Login);