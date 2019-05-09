import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TrackActionModal from '../components/common/TrackActionModal';
import { addSongsToPlaylist, removeSongsFromPlaylist } from '../actions/PlayListsAction';

var mapStateToProp = state =>{
    return {
        authenticated: state.authentication.authenticated,
        playLists: state.playLists.playLists
    }
}

var mapDispatchToProps = dispatch =>{
    return {
        addSongsToPlayLists: (payload)=>{
            dispatch(addSongsToPlaylist(payload));
        },
        removeSongsFromPlaylist: (payload)=>{
            dispatch(removeSongsFromPlaylist(payload));
        }
    }
}

export default withRouter(connect(mapStateToProp,mapDispatchToProps)(TrackActionModal));