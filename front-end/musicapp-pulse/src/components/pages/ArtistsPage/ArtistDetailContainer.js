import {connect} from 'react-redux';
import { getSingerById, getTopPopularBySinger } from '../../../actions/ArtistAction';
import ArtistDetail from './ArtistDetail';
import { getAlbumsBySingerId } from '../../../actions/AlbumsAction';

var mapStateToProp = state =>{
    return {
        singer: state.artists.singer,
        topPopular: state.artists.topPopular,
        isGettingSinger: state.artists.isGettingSinger,
        albums: state.albums
    }
}

var mapDispatchToProps = dispatch =>{
    return{
        getSingerById: (id)=>{
            dispatch(getSingerById(id));
        },
        getTopPopular: (id)=>{
            dispatch(getTopPopularBySinger(id))
        },
        getAlbumsBySingerId: (id)=>{
            dispatch(getAlbumsBySingerId(id));
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(ArtistDetail);