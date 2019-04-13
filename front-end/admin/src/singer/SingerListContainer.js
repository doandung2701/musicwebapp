import {connect} from 'react-redux';
import { getAllSingers, deleteSinger, openModal } from './SingerAction';
import SingerList from './SingerList';

var mapStateToProp = state=>({
    singerList: state.singerList
})

var mapDispatchToProps = dispatch=>{
    return {
        getAllSingers: ()=>{
            dispatch(getAllSingers());
        },
        deleteSinger:(id)=>dispatch(deleteSinger(id)),
        openModal:(data)=>dispatch(openModal(data)),
      
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(SingerList/*xong chỗ nào phải dùng SingerList thì thay
    bằng SingerListContainer là xong*/);