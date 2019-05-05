import { connect } from 'react-redux'
import SongModal from './SongModal';
import { uploadSong } from '../../actions/SongAction';

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps =dispatch=> {
    return {
        uploadSong:(data,image,song)=>dispatch(uploadSong(data,image,song))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SongModal);