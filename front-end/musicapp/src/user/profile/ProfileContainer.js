
import {connect} from 'react-redux';
import Profile from "./Profile";
import { loadCurrentUser } from '../../app/AppAction';
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}

var mapDispatchToProps = dispatch=>{
    return {
        loadCurrentUser: ()=>{
            dispatch(loadCurrentUser());
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(Profile);