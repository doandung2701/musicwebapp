import {
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

var initialState = {
    comments: [
        {
            user: {

            }
            , replies: [
                {
                    user: {

                    }
                }
            ]
        }
    ],
    isGettingComments: false,
    isPostingComment: false,
    isEdittingComment: false,
    error: null
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_COMMENTS_BY_PRODUCT_ID:
            return {
                ...state,
                isGettingComments: true
            }
        case GET_COMMENTS_BY_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                comments: action.comments,
                isGettingComments: false
            }
        case GET_COMMENTS_BY_PRODUCT_ID_FAIL:
            return {
                ...state,
                isGettingComments: false
            }
        case POSTING_COMMENT:
            return {
                ...state,
                isPostingComment: true
            }
        case POST_COMMENT_SUCCESS:
            return {
                ...state,
                isPostingComment: false,
                comments: action.comments
            }
        case POST_COMMENT_FAIL:
            return {
                ...state,
                isPostingComments: false
            }
        case EDITTING_COMMENT:
            return {
                ...state,
                isEdittingComment: true
            }
        case EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                isEdittingComment: false,
                comments: action.comments
            }
        case EDIT_COMMENT_FAIL:
            return {
                ...state,
                isEdittingComment: false
            }
        default:
            return state;
    }
}