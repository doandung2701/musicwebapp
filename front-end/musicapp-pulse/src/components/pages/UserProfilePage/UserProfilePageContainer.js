import {connect} from 'react-redux';
import UserProfilePage from './UserProfilePage';
import { loadCurrentUser, changeAva } from '../../../actions/AuthentcationAction';
import { getSongByUserId } from '../../../actions/SongAction';
import { addSongToQueue } from '../../player/PlayerAction';

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
        getSongByUserId : (page,id)=>{
            dispatch(getSongByUserId(page,id));
        },
        addSongToQueue : (src)=>{
            dispatch(addSongToQueue(src))
        },
        changeAva: (data,userId)=>{
            dispatch(changeAva(data,userId));
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(UserProfilePage);