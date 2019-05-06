import {connect} from 'react-redux';
import AlbumList from './AlbumList';
import { getAllAlbums, deleteAlbum, openModal } from './AlbumAction';

var mapStateToProp = state=>({
    albumList: state.albumList
})

var mapDispatchToProps = dispatch=>{
    return {
        getAllAlbums: ()=>{
            dispatch(getAllAlbums());
        },
        deleteAlbum:(id)=>dispatch(deleteAlbum(id)),
        openModal:(id)=>dispatch(openModal(id)),
      
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(AlbumList/*xong chỗ nào phải dùng SingerList thì thay
    bằng SingerListContainer là xong*/);