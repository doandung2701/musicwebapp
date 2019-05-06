import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TrackActionModal from '../components/common/TrackActionModal';

var mapStateToProp = state =>{
    return {
        authenticated: state.authentication.authenticated,
    }
}

var mapDispatchToProps = dispatch =>{
    return {
     
    }
}

export default withRouter(connect(mapStateToProp,mapDispatchToProps)(TrackActionModal));