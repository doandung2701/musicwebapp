
import {connect} from 'react-redux';
import Profile from "./Profile";
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProp,null)(Profile);