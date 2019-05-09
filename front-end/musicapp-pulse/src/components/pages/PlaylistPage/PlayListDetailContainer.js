import {connect} from 'react-redux';
import { getPlaylistsById } from "../../../actions/PlayListsAction";
import { addMutipleSongToQueue, changeAudioSrc } from '../../player/PlayerAction';
import PlayListDetail from './PlayListDetail';

var mapStateToProp = state =>{
    return {
        playLists: state.playLists,
        list: state.songs.list,
        authenticated: state.authentication.authenticated
    }
}

var mapDispatchToProps = dispatch =>{
    return{
       getPlayListById: (id)=>{
           dispatch(getPlaylistsById(id))
       },
       addMultiSongsToQueue : (songs)=>{
           dispatch(addMutipleSongToQueue(songs));
       },
       changeAudioSrc: (src)=>{
           dispatch(changeAudioSrc(src))
       }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(PlayListDetail);