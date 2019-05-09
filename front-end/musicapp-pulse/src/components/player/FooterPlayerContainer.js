import {connect} from 'react-redux';
import { changePlayerStatus, changeAudioSrc, toggleRepeat } from './PlayerAction';
import FooterPlayer from './FooterPlayer';

let mapStateToProps = state=>({
    player: state.player,
    authenticated: state.authentication.authenticated
})

let mapDispatchToProps = dispatch =>({
    changePlayerStatus: (status)=>{
        dispatch(changePlayerStatus(status));
    },
    changeAudioSrc : (src)=>{
        dispatch(changeAudioSrc(src))
    },
    toggleRepeat: ()=>{
        dispatch(toggleRepeat())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(FooterPlayer);