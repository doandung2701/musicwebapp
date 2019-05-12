import * as actionConstants from '../constants/index'
import { openNotificationWithIcon } from "../common/notification";
import { CATEGORY_SHOW_MODAL, CATEGORY_CLOSE_MODAL } from "./CategoryConstants";

const initialStateModal = {
    isShow: false,
    category: {
        categoryId: 0,
        categoryName: '',
        categoryDes: ''
    },
    isLoading: false,
    error: null
}

export const categoryModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case CATEGORY_SHOW_MODAL:
            return {
                ...state,
                isShow: true,
                category: action.payload
            }
        case CATEGORY_CLOSE_MODAL:
            return {
                ...state,
                isShow: false
            }
        case actionConstants.UPDATING_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case actionConstants.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.UPDATE_CATEGORY_FAIL: 
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionConstants.CREATING_CATEGORY: {
            return {
                ...state,
                isLoading: true
            }

        }
        case actionConstants.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.CREATE_CATEGORY_FAIL: {
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
    categoryList: [],
    isGettingCategoryList: false,
    isLoadingDelete: false,
    isUpdating: false,
    error: null
}

export const categoryListReducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionConstants.GETTING_CATEGORY:
            return {
                ...state,
                isGettingCategoryList: true
            }
        case actionConstants.GET_CATEGORY_SUCCESS:
            let payload = [...action.payload];
            return {
                ...state,
                isGettingCategoryList: false,
                categoryList: payload
            }
        case actionConstants.GET_CATEGORY_FAIL:
            return {
                ...state,
                isGettingCategoryList: false,
                error: state.error
            }
        case actionConstants.DELETING_CATEGORY:
            return {
                ...state,
                isLoadingDelete: true,
            }
        case actionConstants.DELETE_CATEGORY_SUCCESS:
            var categoryListResult = state.categoryList.filter(item => item.categoryId != action.payload)
            openNotificationWithIcon('success', 'Category', 'Delete Category success');
            console.log(categoryListResult);
            return {
                ...state,
                categoryList: categoryListResult,
                isLoadingDelete: false,
            }
        case actionConstants.DELETE_CATEGORY_FAIL:
            openNotificationWithIcon('error', 'Cateogry', 'Delete Cateogry error');
            return {
                ...state,
                isLoadingDelete: false,
                error: action.error
            }
        case actionConstants.CREATING_CATEGORY:
            return {
                ...state
            }
        case actionConstants.CREATE_CATEGORY_SUCCESS:
            openNotificationWithIcon('success', 'Category', 'Create Category success');
            console.log(action.payload);
            return {
                ...state,
                categoryList: [...state.categoryList, action.payload] //trả về mảng với list ban đầu với, phần tử mới thêm vào
            }
        case actionConstants.CREATE_CATEGORY_FAIL:
            return {
                ...state,
                error: action.error
            }
            case actionConstants.UPDATE_CATEGORY_SUCCESS:
            openNotificationWithIcon('success', 'Category', 'Update Category success');
            var index = state.categoryList.findIndex(item => item.categoryId == action.payload.categoryId);
            let categoryNew = state.categoryList;
            categoryNew[index] = action.payload;
            return {
                ...state,
                playListList: categoryNew
            }
        case actionConstants.UPDATE_CATEGORY_FAIL: 
        openNotificationWithIcon('error', 'Category', 'Update Category error');
            return {
                ...state,
            }
        default:
            return state
    }
}