import {connect} from 'react-redux';
import Trending from './Trending';
import { getTrendingSongs } from '../../actions/SongAction';

let mapStateToProps = state=>({
    songs: state.songs
})

let mapDispatchToProps = dispatch =>({
   getTrendingSongs : ()=>{
       dispatch(getTrendingSongs())
   }
})

export default connect(mapStateToProps,mapDispatchToProps)(Trending);