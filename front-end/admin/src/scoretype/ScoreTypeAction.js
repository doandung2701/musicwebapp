import { GETTING_ALL_SCORETYPE, GET_SCORETYPE_SUCCESS, GET_SCORETYPE_FAIL, CREATING_SCORETYPE, CREATE_SCORETYPE_SUCCESS, CREATE_SCORETYPE_FAIL, DELETING_SCORETYPE, DELETE_SCORETYPE_SUCCESS, DELETE_SCORETYPE_FAIL, UPDATING_SCORETYPE, UPDATE_SCORETYPE_SUCCESS, UPDATE_SCORETYPE_FAIL, GETTING_SCORETYPE_BY_ID, GET_SCORETYPE_BY_ID_SUCCESS, GET_SCORETYPE_BY_ID_FAIL, SCORETYPE_SHOW_MODAL, SCORETYPE_CLOSE_MODAL } from "./ScoreTypeConstants";
import { getAllScoreTypeApi, createScoreTypeApi, deleteScoreTypeApi, getScoreTypeByIdApi, updateScoreTypeApi } from "../api/score-type-Api";
export const openModal = (data = {
    scoreId: 0,
    scoreValue: 0,
}) => ({
    type: SCORETYPE_SHOW_MODAL,
    payload: data
})
export const closeModal = () => ({
    type: SCORETYPE_CLOSE_MODAL
})
const gettingScoreType = () => ({
    type: GETTING_ALL_SCORETYPE
})

const getAllScoreTypesuccess = (ScoreTypes) => ({
    type: GET_SCORETYPE_SUCCESS,
    payload: ScoreTypes
})

const getAllScoretypeFail = (error) => ({
    type: GET_SCORETYPE_FAIL,
    error
})

const creatingScoreType = () => ({
    type: CREATING_SCORETYPE
})

const createScoreTypesuccess = (scoreType) => ({
    type: CREATE_SCORETYPE_SUCCESS,
    payload: scoreType
})

const createScoreTypeFail = (error) => ({
    type: CREATE_SCORETYPE_FAIL,
    error
})

const deletingScoreType = () => ({
    type: DELETING_SCORETYPE
})

const deleteScoreTypesuccess = (data) => ({
    type: DELETE_SCORETYPE_SUCCESS,
    payload: data
})

const deleteScoreTypeFail = (error) => ({
    type: DELETE_SCORETYPE_FAIL,
    error
})

const updatingScoreType = () => ({
    type: UPDATING_SCORETYPE
})

const updateScoreTypesuccess = (scoreType) => ({
    type: UPDATE_SCORETYPE_SUCCESS,
    payload: scoreType
})

const updateScoreTypeFail = error => ({
    type: UPDATE_SCORETYPE_FAIL,
    error
})

const gettingScoreTypeById = () => ({
    type: GETTING_SCORETYPE_BY_ID
})

const getScoreTypeByIdSuccess = (scoreType) => ({
    type: GET_SCORETYPE_BY_ID_SUCCESS,
    payload: scoreType
})

const getScoreTypeByIdFail = (error) => ({
    type: GET_SCORETYPE_BY_ID_FAIL,
    error
})

export const getAllScoreType = () => {
    return dispatch => {
        dispatch(gettingScoreType());
        getAllScoreTypeApi().then(data => {
            dispatch(getAllScoreTypesuccess(data.data))
        }).catch(error => {
            if (error.response/*trong truong hop server khong sap*/) {
                /*ở chỗ này có thể gọi thêm alert để thông báo lỗi
                error.response.data thì
               không cần phải cho thêm error vào dispatch, còn cho error vào
               dispatch thì thông báo lỗi ở component */
                dispatch(getAllScoretypeFail(error.response.data));
            } else {/*truong hop server sap*/
                /*ở chỗ này có thể gọi thêm alert để thông báo lỗi thì
                    không cần phải cho thêm error vào dispatch, còn cho error vào
                    dispatch thì thông báo lỗi ở component */
                dispatch(getAllScoretypeFail("Unexpected error occured"));
            }
        })
    }
}

export const createScoreType = (scoreType) => {
    /*scoreType gửi lên có các thuộc tính trong class ScoreType ở backend */
    return dispatch => {
        dispatch(creatingScoreType());
        createScoreTypeApi(scoreType).then(data => {
            dispatch(createScoreTypesuccess(data.data));//trả về để hiển thị luôn, hoặc có thể fetch lại toàn bộ list nếu muốn
        }).catch(error => {
            if (error.response) {
                dispatch(createScoreTypeFail(error.response.data));
            } else {
                dispatch(createScoreTypeFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteScoreType = (scoreTypeId) => {
    return dispatch => {
        dispatch(deletingScoreType());
        deleteScoreTypeApi(scoreTypeId).then(data => {
            dispatch(deleteScoreTypesuccess(scoreTypeId));
        }).catch(error => {
            if (error.response) {
                dispatch(deleteScoreTypeFail(error.response.data));
            } else {
                dispatch(deleteScoreTypeFail("Unexpected error occured"));
            }
        })
    }
}

export const getScoreTypeById = (scoreTypeId) => {
    return dispatch => {
        dispatch(gettingScoreTypeById());
        getScoreTypeByIdApi(scoreTypeId).then(data => {
            dispatch(getScoreTypeByIdSuccess(data.data));
        }).catch(error => {
            if (error.response) {
                dispatch(getScoreTypeByIdFail(error.response.data));
            } else {
                dispatch(getScoreTypeByIdFail("Unexpected error occured"));
            }
        })
    }
}

export const updateScoreType = (scoreTypeId, scoreTypeDetail) => {
    /*scoreTypeDetail gửi lên có các thuộc tính trong class ScoreType ở backend */
    return dispatch => {
        dispatch(updatingScoreType());
        updateScoreTypeApi(scoreTypeId, scoreTypeDetail).then(data => {
            dispatch(updateScoreTypesuccess(data.data));//trả về scoreType để hiển thị luôn, đỡ phải fetch lại
        }).catch(error => {
            if (error.response) {
                dispatch(updateScoreTypeFail(error.response.data));
            } else {
                dispatch(updateScoreTypeFail("Unexpected error occured"));
            }
        })
    }
}