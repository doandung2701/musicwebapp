import {connect} from 'react-redux';
import TrackPage from './TrackPage';
import { getSongById, getSongBySingerPaging, wipeFetchOnScrollSongs } from '../../../actions/SongAction';
import { changeAudioSrc, addSongToQueue } from '../../player/PlayerAction';
var mapStateToProp = state =>{
    return {
        player: state.player,
        list: state.songs.list,
        isGetting: state.songs.isGettingSongById,
        singleSong: state.songs.singleSong
    }
}

var mapDispatchToProps = dispatch =>{
    return {
        getSongById: (id)=>{
            dispatch(getSongById(id))
        },
        getSongBySinger: (page,id)=>{
            dispatch(getSongBySingerPaging(page,id))
        },
        changeAudioSrc: (src)=>{
            dispatch(changeAudioSrc(src))
        },
        addSongToQueue: (src)=>{
            dispatch(addSongToQueue(src))
        },
        wipeData: ()=>{
            dispatch(wipeFetchOnScrollSongs())
        },
        dispatch: dispatch
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(TrackPage);