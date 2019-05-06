
import Alert from 'react-s-alert';
import { LOADING_CURRENT_USER, LOADING_CURRENT_USER_SUCCESS, LOADING_CURRENT_USER_FAIL, LOG_OUT, ACCESS_TOKEN, UPLOADING_AVA, UPLOAD_AVA_SUCCESS, UPLOAD_AVA_FAIL, SAVING_FAV_CAT, SAVE_FAV_CAT_SUCCESS, SAVE_FAV_CAT_FAIL } from '../constants/constants';
import { getCurrentUser, changeAvaApi, saveFavCatApi } from '../Api/UserApi';
import { history } from '../helpers/helper';
import { message } from 'antd';

export const loadingCurrentUser = () => ({
    type: LOADING_CURRENT_USER
})

export const loadCurrentUserSuccess = (user) => ({
    type: LOADING_CURRENT_USER_SUCCESS,
    user
})

export const loadCurrentUserFail = (error) => ({
    type: LOADING_CURRENT_USER_FAIL,
    error
})

const savingFavCat = ()=>({
    type: SAVING_FAV_CAT
})

const saveFavCatSuccess = (user)=>({
    type: SAVE_FAV_CAT_SUCCESS,
    user
})

const saveFavCatFail = ()=>({
    type: SAVE_FAV_CAT_FAIL
})

export const saveFavCat = (payload)=>{
    return async dispatch=>{
        dispatch(savingFavCat());
        try{
            let data = await saveFavCatApi(payload);
            dispatch(saveFavCatSuccess(data.data));
        }catch(err){
            dispatch(saveFavCatFail());
            message.error("Failure, an error occured :(");
        }
    }
}

export const loadCurrentUser = () => {
    return dispatch => {
        dispatch(loadingCurrentUser());
        getCurrentUser()
            .then(response => {
                dispatch(loadCurrentUserSuccess(response))
            }).catch(error => {
                dispatch(loadCurrentUserFail(error))
            });
    }
}

export const logout = () => {
    Alert.closeAll();
    localStorage.removeItem(ACCESS_TOKEN);
    history.push("/");
    Alert.success("You're safely logged out!");
    return {
        type: LOG_OUT
    }
}

const uploadingAva = () => ({
    type: UPLOADING_AVA
})

const uploadAvaSuccess = (data) => ({
    type: UPLOAD_AVA_SUCCESS,
    data
})

const uploadAvaFail = () => ({
    type: UPLOAD_AVA_FAIL
})

export const changeAva = (data, userId) => {
    return dispatch => {
        dispatch(uploadingAva());
        changeAvaApi(data, userId).then(data => {
            dispatch(uploadAvaSuccess(data.data));
            message.success("You have change your avatar successfully", 3)
        }).catch(error => {
            if (error.response) {
                message.error("Change avatar fail: " + error.response.data,
                    3);
            }
            dispatch(uploadAvaFail());
        })
    }
}
