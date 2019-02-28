
import {connect} from 'react-redux';
import Signup from './Signup';
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProp,null)(Signup);