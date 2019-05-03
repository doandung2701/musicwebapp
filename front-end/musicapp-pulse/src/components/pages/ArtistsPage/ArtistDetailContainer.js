import {connect} from 'react-redux';
import { getSingerById, getTopPopularBySinger } from '../../../actions/ArtistAction';
import ArtistDetail from './ArtistDetail';

var mapStateToProp = state =>{
    return {
        singer: state.artists.singer,
        topPopular: state.artists.topPopular,
        isGettingSinger: state.artists.isGettingSinger
    }
}

var mapDispatchToProps = dispatch =>{
    return{
        getSingerById: (id)=>{
            dispatch(getSingerById(id));
        },
        getTopPopular: (id)=>{
            dispatch(getTopPopularBySinger(id))
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(ArtistDetail);