import * as actionConstants from "../constants/index";
import * as categoryApi from "../api/categoryApi";
import { CATEGORY_SHOW_MODAL, CATEGORY_CLOSE_MODAL } from "./CategoryConstants";

export const openModal = (data = {
    categoryId: '',
    categoryName: '',
    categoryDes: ''
})=> ({
    type: CATEGORY_SHOW_MODAL,
    payload: data
})

export const closeModal = () => ({
    type: CATEGORY_CLOSE_MODAL
})

const gettingCategory = () => ({
    type: actionConstants.GETTING_CATEGORY
})

const getCategorySuccess = (category) => ({
    type: actionConstants.GET_CATEGORY_SUCCESS,
    payload: category
})

const getCategoryFail = (error) => ({
    type: actionConstants.GET_CATEGORY_FAIL,
    error
})

const deletingCategory = () => ({
    type: actionConstants.DELETING_CATEGORY
})

const deleteCategorySuccess = (categoryId) => ({
    type: actionConstants.DELETE_CATEGORY_SUCCESS,
    payload: categoryId
})

const deleteCategoryFail = (error) => ({
    type: actionConstants.DELETE_CATEGORY_FAIL,
    error
})

const creatingCategory = () => ({
    type: actionConstants.CREATING_CATEGORY
})

const createCategorySuccess = (category) => ({
    type: actionConstants.CREATE_CATEGORY_SUCCESS,
    payload: category
})

const createCategoryFail = (error) => ({
    type: actionConstants.CREATE_CATEGORY_FAIL,
    error
})

const updatingCategory = () => ({
    type: actionConstants.UPDATING_CATEGORY
})

const updateCategorySuccess = (category) => ({
    type: actionConstants.UPDATE_CATEGORY_SUCCESS,
    payload: category
})

const updateCategoryFail = (error) => ({
    type: actionConstants.UPDATE_AUTHOR_FAIL,
    error
})


export const createCategory = (category) => {
    return dispatch => {
        dispatch(creatingCategory());
        categoryApi.createCategoryApi(category).then(data=> {
            category = {
                ...category,
                categoryId: data.data[0].categoryId
            }
            dispatch(createCategorySuccess(category));
        }).catch(error => {
            if (error.response){
                dispatch(createCategoryFail(error.response.data));
            }else{
                dispatch(createCategoryFail("Unexpected error occured"));
            }
        })
    }
}

export const updateCategory = (category) => {
    return dispatch => {
        dispatch(updatingCategory());
        categoryApi.updateCategoryApi(category).then((data) => {
            dispatch(updateCategorySuccess(category));
        }).catch(error => {
            if (error.response){
                dispatch(updateCategoryFail(error.response.data));
            }else{
                dispatch(updateCategoryFail("Unexpected error occured"));
            }
        })
    }
}

export const getAllCategory = () => {
    return (dispatch) => {
        dispatch(gettingCategory);
        categoryApi.getAllCategoryApi().then(data => {
            dispatch(getCategorySuccess(data.data));
        }).catch(error => {
            if (error.response /*trường hợp server không sập thì có phản hồi*/) {
                dispatch(getCategoryFail(error.response.data));
            } else { /*trường hợp server sập*/
                dispatch(getCategoryFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteCategory = (categoryId) => {
    return dispatch => {
        dispatch(deletingCategory());
        categoryApi.deleteCategoryApi(categoryId).then((data) => {
            dispatch(deleteCategorySuccess(categoryId));
        }).catch(error => {
            if (error.response){
                dispatch(deleteCategoryFail(error.response.data));
            }else{
                dispatch(deleteCategoryFail("Unexpected error occured"));
            }
        })
    }
}
