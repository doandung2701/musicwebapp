import { loadCurrentUser } from "./AppAction";
import {connect} from 'react-redux';
import App from "./App";
var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}

var mapDispatchToProps = dispatch =>{
    return{
        loadCurrentlyLoggedInUser: ()=>{
            dispatch(loadCurrentUser());
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(App);