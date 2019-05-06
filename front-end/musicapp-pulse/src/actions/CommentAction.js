import {
    GETTING_COMMENTS_BY_USER_ID,
    GET_COMMENTS_BY_USER_ID_SUCCESS,
    GET_COMMENTS_BY_USER_ID_FAIL,
    GETTING_COMMENTS_BY_PRODUCT_ID,
    GET_COMMENTS_BY_PRODUCT_ID_SUCCESS,
    GET_COMMENTS_BY_PRODUCT_ID_FAIL,
    POSTING_COMMENT,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL,
    EDITTING_COMMENT,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAIL
} from "../constants/constants";
import {
    getCommentsBySongIdApi,
    postReplyApi,
    postCommentApi,
    editCommentApi
} from "../Api/CommentApi";
import { message } from "antd";

const gettingCommentsByUserId = () => ({
    type: GETTING_COMMENTS_BY_USER_ID
})

const getCommentsByUserIdSuccess = (comments) => ({
    type: GET_COMMENTS_BY_USER_ID_SUCCESS,
    comments
})

const getCommentsByUserIdFail = (error) => ({
    type: GET_COMMENTS_BY_USER_ID_FAIL,
    error
})

const gettingCommentsBySongId = () => ({
    type: GETTING_COMMENTS_BY_PRODUCT_ID
})

const getCommentsBySongIdSuccess = (comments) => ({
    type: GET_COMMENTS_BY_PRODUCT_ID_SUCCESS,
    comments
})

const getCommentsBySongIdFail = (error) => ({
    type: GET_COMMENTS_BY_PRODUCT_ID_FAIL,
    error
})

const postingReply = () => ({
    type: POSTING_COMMENT
})

const postReplySuccess = (comments) => ({
    type: POST_COMMENT_SUCCESS,
    comments
})

const postReplyFail = () => ({
    type: POST_COMMENT_FAIL
})

const edittingComment = () => ({
    type: EDITTING_COMMENT
})

const editCommentSuccess = (comments) => ({
    type: EDIT_COMMENT_SUCCESS,
    comments
})

const editCommentFail = () => ({
    type: EDIT_COMMENT_FAIL
})

export const postComment = (comment) => {
    return async dispatch => {
        dispatch(postingReply());
        try {
            let data = await postCommentApi(comment)
            dispatch(postReplySuccess(data.data));
            console.log(data.data)
            message.success("Your comment has been posted.", 3)
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                message.error("Can't post your comment because of an internal server error.", 3);
            } else {
                message.error("Can't post your comment because of an unexpected error.", 3);
            }
            dispatch(postReplyFail());
        }
    }
}

export const editComment = (comment) => {
    return dispatch => {
        dispatch(edittingComment());
        editCommentApi(comment).then(data => {
            dispatch(editCommentSuccess(data.data));
            message.success("Your comment has been modified successfully!");
        }).catch(error => {
            if (error.response) {
                message.error("Can't edit your reply because of an internal server error.", 3)
            } else {
                message.error("Can't edit your reply because of an unexpected error.", 3)
            }
            dispatch(editCommentFail());
        })
    }
}

export const getCommentsBySongId = (id) => {
    return dispatch => {
        dispatch(gettingCommentsBySongId());
        getCommentsBySongIdApi(id).then(data => {
            dispatch(getCommentsBySongIdSuccess(data.data));
            console.log(data.data)
        }).catch(error => {
            dispatch(getCommentsBySongIdFail(error));
        })
    }
}

export const postReply = (reply) => {
    return dispatch => {
        dispatch(postingReply());
        postReplyApi(reply).then(data => {
            message.success("Your reply has been posted.", 3)
            dispatch(postReplySuccess(data.data));
        }).catch(error => {
            if (error.response) {
                message.error("Can't post your reply because of an internal server error.", 3)
            } else {
                message.error("Can't post your reply because of an unexpected error.", 3)
            }
            dispatch(postReplyFail());
        })
    }
}

