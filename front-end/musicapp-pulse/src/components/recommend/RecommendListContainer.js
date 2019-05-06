import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RecommendList from './RecommendList';
import { getRecommendedSongs } from '../../actions/SongAction';

var mapStateToProp = state =>{
    return {
        authentication: state.authentication,
        recommendedSongs: state.songs.recommendedSongs,
        isGettingRecommendedSongs: state.songs.isGettingRecommendedSongs
    }
}

var mapDispatchToProps = dispatch =>{
    return {
        getRecommendedSongs : (ids)=>{
            dispatch(getRecommendedSongs(ids));
        }
    }
}

export default withRouter(connect(mapStateToProp,mapDispatchToProps)(RecommendList));