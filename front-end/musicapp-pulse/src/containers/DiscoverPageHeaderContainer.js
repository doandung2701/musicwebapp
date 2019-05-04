import {connect} from 'react-redux';
import { getDiscoverHeaderData } from '../actions/SongAction';
import DiscoverPageHeader from '../components/headers/DiscoverPageHeader';

let mapStateToProps = state=>({
    random4Jazz: state.songs.random4Jazz,
    random4Pop: state.songs.random4Pop,
    isGetting: state.songs.isGettingDiscoverHeader
})

let mapDispatchToProps = dispatch =>({
    getData: ()=>{
        dispatch(getDiscoverHeaderData());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(DiscoverPageHeader);