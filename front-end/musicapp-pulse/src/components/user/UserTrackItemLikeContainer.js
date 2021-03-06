import {connect} from 'react-redux';
import { changePlayerStatus, changeAudioSrc } from '../player/PlayerAction';
import UserTrackItemLike from './UserTrackItemLike';

let mapStateToProps = state=>({
    player: state.player
})

let mapDispatchToProps = dispatch =>({
    changePlayerStatus: (status)=>{
        dispatch(changePlayerStatus(status));
    },
    changeAudioSrc : (src)=>{
        dispatch(changeAudioSrc(src))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(UserTrackItemLike);