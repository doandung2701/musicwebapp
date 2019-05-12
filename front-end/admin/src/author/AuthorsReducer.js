import * as actionConstants from '../constants/index'
import { openNotificationWithIcon } from "../common/notification";
import { AUTHOR_SHOW_MODAL, AUTHOR_CLOSE_MODAL } from "./AuthorConstants";

const initialStateModal = {
    isShow: false,
    author: {
        authorId: 0,
        authorName: '',
        thumbnail: '',
        briefDescription: ''
    },
    isLoading: false,
    error: null
}

export const authorModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case AUTHOR_SHOW_MODAL:
            return {
                ...state,
                isShow: true,
                author: action.payload
            }
        case AUTHOR_CLOSE_MODAL:
            return {
                ...state,
                isShow: false
            }
        case actionConstants.UPDATING_AUTHOR:
            return {
                ...state,
                isLoading: true
            }
        case actionConstants.UPDATE_AUTHOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.UPDATE_AUTHOR_FAIL: 
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionConstants.CREATING_AUTHOR: {
            return {
                ...state,
                isLoading: true
            }

        }
        case actionConstants.CREATE_AUTHOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.CREATE_AUTHOR_FAIL: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        default:
            return state;
    }
}

const initialSate = {
    authorList: [],
    isGettingAuthorList: false,
    isLoadingDelete: false,
    isUpdating: false,
    error: null
}

export const authorListReducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionConstants.GETTING_AUTHORS:
            return {
                ...state,
                isGettingAuthorList: true
            }
        case actionConstants.GET_AUTHORS_SUCCESS:
            let payload = [...action.payload];
            return {
                ...state,
                isGettingAuthorList: false,
                authorList: payload
            }
        case actionConstants.GET_AUTHORS_FAIL:
            return {
                ...state,
                isGettingAuthorList: false,
                error: state.error
            }
        case actionConstants.DELETING_AUTHOR:
            return {
                ...state,
                isLoadingDelete: true,
            }
        case actionConstants.DELETE_AUTHOR_SUCCESS:
            var authorListResult = state.authorList.filter(item => item.authorId != action.payload)
            openNotificationWithIcon('success', 'Author', 'Delete Author success');
            console.log(authorListResult);
            return {
                ...state,
                authorList: authorListResult,
                isLoadingDelete: false,
            }
        case actionConstants.DELETE_AUTHOR_FAIL:
            openNotificationWithIcon('error', 'Author', 'Delete Author error');
            return {
                ...state,
                isLoadingDelete: false,
                error: action.error
            }
        case actionConstants.CREATING_AUTHOR:
            return {
                ...state
            }
        case actionConstants.CREATE_AUTHOR_SUCCESS:
            openNotificationWithIcon('success', 'Author', 'Create Author success');
            console.log(action.payload);
            return {
                ...state,
                authorList: [...state.authorList, action.payload] //trả về mảng với list ban đầu với, phần tử mới thêm vào
            }
        case actionConstants.CREATE_AUTHOR_FAIL:
            return {
                ...state,
                error: action.error
            }
            case actionConstants.UPDATE_AUTHOR_SUCCESS:
            openNotificationWithIcon('success', 'Author', 'Update Author success');
            var index = state.authorList.findIndex(item => item.authorId == action.payload.authorId);
            let authorNew = state.authorList;
            authorNew[index] = action.payload;
            return {
                ...state,
                playListList: authorNew
            }
        case actionConstants.UPDATE_AUTHOR_FAIL: 
        openNotificationWithIcon('error', 'Author', 'Update Author error');
            return {
                ...state,
            }
        default:
            return state
    }
}