import {
    GETTING_ALL_AUTHORS,
    GET_ALL_AUTHORS_SUCCESS,
    GET_ALL_AUTHORS_FAIL,
    CREATING_AUTHORS, CREATE_AUTHORS_SUCCESS
} from "./AuthorConstants";

import { openNotificationWithIcon } from "../common/notification";
import { CREATING_AUTHORS, CREATE_AUTHORS_SUCCESS, GET_AUTHORS_BY_NAME_SUCCESS, GET_AUTHORS_BY_NAME_FAIL, GETTING_AUTHORS_BY_NAME,GETTING_AUTHOR_BY_ID,GET_AUTHOR_BY_ID_SUCCESS,GET_AUTHOR_BY_ID_FAIL, UPDATE_AUTHOR_FAIL,DELETE_AUTHOR_FAIL,UPDATE_AUTHOR_SUCCESS, CREATE_AUTHORS_FAIL, DELETE_AUTHOR_SUCCESS , DELETING_AUTHOR} from "./AuthorConstants";
import { UPDATING_AUTHOR } from "../constants";

let initialState = {
    authors: [],
    isGettingAll: false,
    isloadingDelete: false,
    error: null,
}

export const authorsReducer = (state = initialState, action) => {
    switch (action.type) {
        //action get all
        case GETTING_ALL_AUTHORS:
            return {
                ...state,
                isGettingAll: true
            }
        case GET_ALL_AUTHORS_SUCCESS:
            return {
                ...state,
                authors: action.payload,
                isGettingAll: false
            }
        case GET_ALL_AUTHORS_FAIL:
            return {
                ...state,
                isGettingAll: false,
                error: action.error
            }
        
        //case create authors
        case CREATING_AUTHORS:
            return {
                ...state,
            }
        case CREATE_AUTHORS_SUCCESS:
        openNotificationWithIcon('success', 'Author', 'Create authors success');

            return {
                ...state,
                authors: [...state.authors, action.payload],
            }
        case CREATE_AUTHORS_FAIL:
        openNotificationWithIcon('error', 'Author', 'Create scoretype error');

            return {
                ...state,
                error: action.error
            }
        
        //case delete authors
        case DELETING_AUTHOR:
            return {
                ...state,
                isloadingDelete: true
            }
        case DELETE_AUTHOR_SUCCESS:
            var authorResult = state.scoretypeList.filter(item => item.authorId != action.payload);
            openNotificationWithIcon('success', 'Authors', 'Delete author success');
            return {
                ...state,
                authors: authorResult,
                isloadingDelete: false
            }
        case DELETE_AUTHOR_FAIL:
            openNotificationWithIcon('error', 'Authors', 'Delete author error');
            return {
                ...state,
                isloadingDelete: false,
                error: action.error
            }
        case UPDATING_AUTHOR:{
                return {
                    ...state
                }
            }
        case UPDATE_AUTHOR_SUCCESS:
        openNotificationWithIcon('success', 'Author', 'Update author success');

            var index = state.authors.findIndex(item => item.authorId == action.payload.authorId);
            let authorListNew = state.authors;
            authorListNew[index] = action.payload;
            return {
                ...state,
                authors: authorListNew,
            }
        case UPDATE_AUTHOR_FAIL:
        openNotificationWithIcon('error', 'ScoreType', 'Update scoretype error');

            return {
                ...state,
            }

        default:
            return state;
    }
}

var initialState1 = {
    authors: {},
    isloadingGetById: false,
    error: null,
}

export const authorReducer = (state = initialState1, action) => {
    switch (action.type) {
        case GETTING_AUTHOR_BY_ID:
            return {
                ...state,
                isloadingGetById: true
            }
        case GET_AUTHOR_BY_ID_SUCCESS:
            return {
                ...state,
                isloadingGetById: false,
                scoretype: action.payload
            }
        case GET_AUTHOR_BY_ID_FAIL:
            return {
                ...state,
                isloadingGetById: false,
                error: action.error
            }
        default: return state;
    }
}

var initialState2 = {
    authors: [],
    loadingGetByName: false,
    error: null,
}

export const authorListReducer = (state = initialState2, action) => {
    switch (action.type) {
        case GETTING_AUTHORS_BY_NAME:
            return {
                ...state,//es6 spread syntax, lấy toàn bộ thuộc tính của state cho vào state mới
                loadingGetByName: true//chỉ định là thuộc tính này thay đổi
            }
        case GET_AUTHORS_BY_NAME_SUCCESS:
            return {
                ...state,
                loadingGetByName: false,
                authors: action.payload
            }
        case GET_AUTHORS_BY_NAME_FAIL:
            return {
                ...state,
                loadingGetByName: false,
                error: action.error
            }
        default:
            break;
    }
}