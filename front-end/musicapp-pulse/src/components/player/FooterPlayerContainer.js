import {connect} from 'react-redux';
import { changePlayerStatus } from './PlayerAction';
import FooterPlayer from './FooterPlayer';

let mapStateToProps = state=>({
    player: state.player
})

let mapDispatchToProps = dispatch =>({
    changePlayerStatus: (status)=>{
        dispatch(changePlayerStatus(status));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(FooterPlayer);