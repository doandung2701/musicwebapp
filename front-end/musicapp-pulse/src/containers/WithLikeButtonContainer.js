
import {connect} from 'react-redux';
import { likeSong } from '../actions/SongAction';
import withLikeButton from '../components/HOC/WithLikeButton';
import TrackItemLikeBtn from '../components/common/TrackItemLikeBtn';
import TrackPageHeaderLikeBtn from '../components/common/TrackPageHeaderLikeBtn';

const TrackItemLikeBtnWith = withLikeButton(TrackItemLikeBtn);
const TrackPageHeaderLikeBtnWith = withLikeButton(TrackPageHeaderLikeBtn);
var mapStateToProp = state =>{
    return {
        userId: state.authentication.currentUser?state.authentication.currentUser.id:null
    }
}

var mapDispatchToProps = dispatch =>{
    return {
        likeSong: (userId,songId)=>{
            dispatch(likeSong(userId,songId))
        }
    }
}

export const TrackItemLikeBtnWithContainer = connect(mapStateToProp,mapDispatchToProps)(TrackItemLikeBtnWith);
export const TrackPageHeaderLikeBtnWithContainer = connect(mapStateToProp,mapDispatchToProps)(TrackPageHeaderLikeBtnWith);
