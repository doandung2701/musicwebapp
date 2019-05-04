import {connect} from 'react-redux';
import {getAllAuthors} from './Author_Action';
import Author from './Author';

let mapStateToProps = state=>({
    authors: state.authors
})

let mapDispatchToProps = dispatch=>({
    getAllAuthors: ()=>{
        dispatch(getAllAuthors())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Author);