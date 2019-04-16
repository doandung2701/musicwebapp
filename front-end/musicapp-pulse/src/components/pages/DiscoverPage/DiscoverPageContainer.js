import DiscoverPage from "./DiscoverPage";
import {connect} from 'react-redux';
import { loadCurrentUser } from "../../../actions/AuthentcationAction";

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

export default connect(mapStateToProp,mapDispatchToProps)(DiscoverPage);