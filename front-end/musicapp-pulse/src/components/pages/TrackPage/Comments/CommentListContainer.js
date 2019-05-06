import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import { postReply, postComment, editComment, getCommentsBySongId } from '../../../../actions/CommentAction';
import CommentsList from './CommentsList';

var mapStateToProps = state =>{
    return{
        comments: state.comments,
        isLoggedIn: state.authentication.authenticated,
        userId : state.authentication.currentUser?state.authentication.currentUser.id:-1
    }
}

var mapDispatchToProps = dispatch =>{
    return {
        getCommentsBySongId: (id)=>{
            dispatch(getCommentsBySongId(id))
        },
        postReply: (reply)=>{
            dispatch(postReply(reply));
        },
        postComment: (comment)=>{
            dispatch(postComment(comment));
        },
        editComment: (comment)=>{
            dispatch(editComment(comment));
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CommentsList));