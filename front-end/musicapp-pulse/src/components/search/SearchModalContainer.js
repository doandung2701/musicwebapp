import {connect} from 'react-redux';
import SearchModal from './SearchModal';
import { searchSongsAndSingers } from '../../actions/SearchAction';

let mapStateToProps = state=>({
    search: state.search
})

let mapDispatchToProps = dispatch =>({
   getSearchData: (name)=>{
       dispatch(searchSongsAndSingers(name))
   }
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchModal);