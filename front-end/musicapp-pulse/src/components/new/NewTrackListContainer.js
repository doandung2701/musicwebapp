import {connect} from 'react-redux';
import NewTrackList from "./NewTrackList";
import { get8NewestSongs } from '../../actions/SongAction';

var mapStateToProp = state =>{
    return {
        newest8Songs : state.songs.newest8Songs,
        isGetting: state.songs.isGettingNewest8
    }
}

var mapDispatchToProps = dispatch =>{
    return{
        getNewest8: ()=>{
            dispatch(get8NewestSongs())
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(NewTrackList);