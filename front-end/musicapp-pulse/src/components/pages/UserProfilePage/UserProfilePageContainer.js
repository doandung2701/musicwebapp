import {connect} from 'react-redux';
import UserProfilePage from './UserProfilePage';
import { loadCurrentUser, changeAva, saveFavCatSuccess, logout } from '../../../actions/AuthentcationAction';
import { getSongByUserId } from '../../../actions/SongAction';
import { addSongToQueue } from '../../player/PlayerAction';
import { getPlaylistsByUserId, createPlaylist, editPlaylist, deletePlaylist } from '../../../actions/PlayListsAction';

var mapStateToProp = state =>{
    return {
        authentication: state.authentication,
        playLists: state.playLists
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
        },
        getPlayListsByUserId: (userId)=>{
            dispatch(getPlaylistsByUserId(userId));
        },
        saveFavCatSuccess:(data)=>{
            dispatch(saveFavCatSuccess(data))
        },
        logOut:()=>{
            dispatch(logout())
        },
        editPlayList: (payload)=>{
            dispatch(editPlaylist(payload));
        },
        detetePlayList: (id)=>{
            dispatch(deletePlaylist(id));
        },
        createPlayList: (payload)=>{
            dispatch(createPlaylist(payload));
        },
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(UserProfilePage);