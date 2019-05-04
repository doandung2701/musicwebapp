import {connect} from 'react-redux';
import TrackItem from './TrackItem';
import { changePlayerStatus, changeAudioSrc, addSongToQueue } from '../player/PlayerAction';

let mapStateToProps = state=>({
    player: state.player
})

let mapDispatchToProps = dispatch =>({
    changePlayerStatus: (status)=>{
        dispatch(changePlayerStatus(status));
    },
    changeAudioSrc : (src)=>{
        dispatch(changeAudioSrc(src))
    },
    addSongToQueue: (src)=>{
        dispatch(addSongToQueue(src));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(TrackItem);