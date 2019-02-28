
import {connect} from 'react-redux';
import { logout } from "../app/AppAction";
import AppHeader from "./AppHeader";
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}

var mapDispatchToProps = dispatch =>{
    return{
        onLogOut: ()=>{
            dispatch(logout());
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(AppHeader);