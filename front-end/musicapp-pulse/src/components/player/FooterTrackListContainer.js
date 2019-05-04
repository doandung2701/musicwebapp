import {connect} from 'react-redux';
import { changePlayerStatus, changeAudioSrc, removeFromQueue } from './PlayerAction';
import FooterTrackList from './FooterTrackList';

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
    removeFromQueue: (songSrc)=>{
        dispatch(removeFromQueue(songSrc))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(FooterTrackList);