import * as actionConstanst from '../constants/index';
import { openNotificationWithIcon } from '../common/notification';

const initialStateModal = {
    comments: {
        commentId: 0,
        commentCnt: '',
        commentDate: 0,
        parentCmt: '',
        replies: ''
    },
    isLoading: false,
    error: null
}

const initialState = {
    commentList: [],
    isGettingCommentList: false,
    isLoadingDelete: false,
    isUpdating: false,
    error: null
}

export const commentListReducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionConstanst.GETTING_COMMENTS:
            return {
                ...state, //không thay đổi dồn về đây hết
                isGettingSingerList: true //thay đổi
            }
        case actionConstanst.GET_COMMENTS_SUCCESS:
            let payload = [...action.payload];
            payload.forEach((data) => {
                if (data.parentCmt===undefined||data.parentCmt===null) 
                    data.parentCmt = 'No data';
                data.commentDate = new Date(1540447577000).toLocaleDateString();
            })
            return {
                ...state,
                isGettingSingerList: false, 
                commentList: payload
            }
        case actionConstanst.GET_COMMENTS_FAIL:
            return {
                ...state,
                isGettingSingerList: false,
                error: action.error
            }
        case actionConstanst.UPDATING_COMMENT:
            return {
                ...state,
                isUpdating: true
            }
        case actionConstanst.UPDATE_COMMENT_FAIL:
            return {
                ...state,
                isUpdating: false,
                error: action.error
            }
        case actionConstanst.UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                commentList: action.comments
            }
        case actionConstanst.DELETING_COMMENT:
            return {
                ...state,
                isLoadingDelete: true,
            }
        case actionConstanst.DELETE_COMMENT_SUCCESS:
            var commentListResult = state.commentList.filter((item) => item.commentId != action.payload);
            openNotificationWithIcon('success', 'Comment', 'Delete Comment success')
            return {
                ...state,
                isLoadingDelete: false,
                commentList: commentListResult
                //xem delete / thay đổi state thì tự cập nhập lại
            }
        case actionConstanst.DELETE_COMMENT_FAIL:
        openNotificationWithIcon('error', 'Comment', 'Delete Comment error');
            return {
                ...state,
                isLoadingDelete: false
            }
        default :
            return state;
    }
}
