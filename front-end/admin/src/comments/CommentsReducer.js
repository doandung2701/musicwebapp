import * as actionConstanst from '../constants/index';

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

const initialSate = {
    commentList: [],
    isGettingSingerList: false,
    isLoadingDelete: false,
    error: null
}

export const commentListReducer = (state = initialSate, action ) => {
    switch (action.type) {
        case actionConstanst.GETTING_COMMENTS:
            return {
                ...state, //không thay đổi dồn về đây hết
                isGettingSingerList: true //thay đổi
            }
        case actionConstanst.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                isGettingSingerList: false,
                commentList: action.payload
            }
        case actionConstanst.GET_COMMENTS_FAIL:
            return {
                ...state,
                isGettingSingerList: false,
                commentList: action.error
            }
    }
    return state
}
