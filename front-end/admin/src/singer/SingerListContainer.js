import {connect} from 'react-redux';
import { getAllSingers } from './SingerAction';
import SingerList from './SingerList';

var mapStateToProp = state=>({
    singerList: state.singerList
})

var mapDispatchToProps = dispatch=>{
    return {
        getAllSingers: ()=>{
            dispatch(getAllSingers());
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(SingerList/*xong chỗ nào phải dùng SingerList thì thay
    bằng SingerListContainer là xong*/);