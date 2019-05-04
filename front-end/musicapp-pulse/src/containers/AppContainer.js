import {connect} from 'react-redux';
import App from '../App';
import {withRouter} from 'react-router-dom';
import { loadCurrentUser } from '../actions/AuthentcationAction';

var mapStateToProp = state =>{
    return {
        authentication: state.authentication
    }
}

var mapDispatchToProps = dispatch =>{
    return {
        loadCurrentlyLoggedInUser: ()=>{
            dispatch(loadCurrentUser());
        },
    }
}

export default withRouter(connect(mapStateToProp,mapDispatchToProps)(App));