import {connect} from 'react-redux';
import { getAlbumsById } from "../../../actions/AlbumsAction";
import AlbumDetail from './AlbumDetail';
import { addMutipleSongToQueue, changeAudioSrc } from '../../player/PlayerAction';

var mapStateToProp = state =>{
    return {
        albums: state.albums,
        list: state.songs.list
    }
}

var mapDispatchToProps = dispatch =>{
    return{
       getAlbumById: (id)=>{
           dispatch(getAlbumsById(id))
       },
       getSongsByAlbumId: (id)=>{
        //    dispatch(getSongByA)
       },
       addMultiSongsToQueue : (songs)=>{
           dispatch(addMutipleSongToQueue(songs));
       },
       changeAudioSrc: (src)=>{
           dispatch(changeAudioSrc(src))
       }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(AlbumDetail);