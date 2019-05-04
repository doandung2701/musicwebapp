import {connect} from 'react-redux';
import Top5LikeList from './Top5LikeList';
import { getTop5Like } from '../../actions/SongAction';

var mapStateToProp = state =>{
    return {
        songs: state.songs
    }
}

var mapDispatchToProp = dispatch =>{
    return {
        getTop5Like : ()=>{
            dispatch(getTop5Like());
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProp)(Top5LikeList);