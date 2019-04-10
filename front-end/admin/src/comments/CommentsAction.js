import * as actionConstants from "../constants/index";
import * as commentsApi from "../api/commentsApi";

const gettingComments = () => ({
    type: actionConstants.GETTING_COMMENTS
})

const getCommentsSuccess = (comments) => ({
    type: actionConstants.GET_COMMENTS_SUCCESS,
    payload: comments
})

const getCommentsFail = (error) => ({
    type: actionConstants.GET_COMMENTS_FAIL,
    error
})

const creatingComment = () => ({
    type: actionConstants.CREATING_COMMENT,
})

const createCommentSuccess = (comment) => ({
    type: actionConstants.CREATE_COMMENT_SUCCESS,
    payload: comment
})

const createCommentFail = (error) => ({
    type: actionConstants.CREATE_COMMENT_FAIL,
    error
})

const deletingComment = () => ({
    type: actionConstants.DELETING_COMMENT,
})

const deleteCommentSuccess = (commentId) => ({
    type: actionConstants.DELETE_COMMENT_SUCCESS,
    payload: commentId
})

const deleteCommentFail = (error) => ({
    type: actionConstants.DELETE_COMMENT_FAIL,
    error
})

const updatingComment = () => ({
    type: actionConstants.UPDATING_COMMENT,
})

const updateCommentSuccess = (comment) => ({
    type: actionConstants.UPDATE_COMMENT_SUCCESS,
    payload: comment
})

const updateCommentFail = (error) => ({
    type: actionConstants.UPDATE_COMMENT_FAIL,
    error
})

export const getAllComments = () => {
    return (dispatch) => {
        dispatch(gettingComments);
        commentsApi.getAllCommentsApi().then(data => {
            dispatch(getCommentsSuccess(data.data));
        }).catch(error => {
            if (error.response /*trường hợp server không sập thì có phản hồi*/) {
                dispatch(getCommentsFail(error.response.data));
            } else { /*trường hợp server sập*/
                dispatch(getCommentsFail("Unexpected error occured"));
            }
        })
    }
}

export const createComment = (comment) => {
    return dispatch => {
        dispatch(creatingComment);
        commentsApi.createCommentApi(comment).then(data => {
            dispatch(createCommentSuccess(data.data));
        }).catch(error => {
            if (error.response) {
                dispatch(createCommentFail(error.response.data));
            } else {
                dispatch(createCommentFail("Unexpected error occured"));
            }
        })
    }
}

export const updateComment = (commentId,commentDetail) => {
    return dispatch => {
        dispatch(updatingComment);
        commentsApi.updateCommentApi(commentId,commentDetail).then(data => {
            dispatch(updateCommentSuccess(data.data));
        }).catch(error => {
            if (error.response){
                dispatch(updateCommentFail(error.response.data));
            }else{
                dispatch(updateCommentFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteComment = (commentId) => {
    return dispatch => {
        dispatch(deletingComment);
        commentsApi.deleteCommentApi(commentId).then(data => {
            dispatch(deleteCommentSuccess(commentId));
        }).catch(error => {
            if (error.response){
                dispatch(deleteCommentFail(error.response.data));
            }else{
                dispatch(deleteCommentFail("Unexpected error occured"));
            }
        })
    }
}
