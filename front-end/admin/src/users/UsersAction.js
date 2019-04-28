import * as actionConstants from "../constants/index";
import * as usersApi from "../api/usersApi";

const gettingUsers = () => ({
    type: actionConstants.GETTING_USERS
})

const getUsersSuccess = (users) => ({
    type: actionConstants.GET_USERS_SUCCESS,
    payload: users
})

const getUsersFail = (error) => ({
    type: actionConstants.GET_USERS_FAIL,
    error
})

const creatingUser = () => ({
    type: actionConstants.CREATING_USER,
})

const createUserSuccess = (User) => ({
    type: actionConstants.CREATE_USER_SUCCESS,
    payload: User
})

const createUserFail = (error) => ({
    type: actionConstants.CREATE_USER_FAIL,
    error
})

const deletingUser = () => ({
    type: actionConstants.DELETING_USER,
})

const deleteUserSuccess = (userId) => ({
    type: actionConstants.DELETE_USER_SUCCESS,
    payload: userId
})

const deleteUserFail = (error) => ({
    type: actionConstants.DELETE_USER_FAIL,
    error
})

const updatingUser = () => ({
    type: actionConstants.UPDATING_USER,
})

const updateUserSuccess = (users) => ({
    type: actionConstants.UPDATE_USER_SUCCESS,
    payload: users
})

const updateUserFail = (error) => ({
    type: actionConstants.UPDATE_USER_FAIL,
    error
})

const toggleActiveUserApi = (id, active) => ({
    type: actionConstants.TOGGLE_USER_EMAIL,
    id,
    active
})

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch(gettingUsers);
        usersApi.getAllUsersApi().then(data => {
            dispatch(getUsersSuccess(data.data));
        }).catch(error => {
            if (error.response /*trường hợp server không sập thì có phản hồi*/) {
                dispatch(getUsersFail(error.response.data));
            } else { /*trường hợp server sập*/
                dispatch(getUsersFail("Unexpected error occured"));
            }
        })
    }
}

export const createUser = (user) => {
    return dispatch => {
        dispatch(creatingUser);
        usersApi.createUserApi(user).then(data => {
            dispatch(createUserSuccess(data.data));
        }).catch(error => {
            if (error.response) {
                dispatch(createUserFail(error.response.data));
            } else {
                dispatch(createUserFail("Unexpected error occured"));
            }
        })
    }
}

export const updateComment = (commentId,commentDetail) => {
    return dispatch => {
        dispatch(updatingUser);
       usersApi.updateUserApi(commentId,commentDetail).then(data => {
            dispatch(updateUserSuccess(data.data));
        }).catch(error => {
            if (error.response){
                dispatch(updateUserFail(error.response.data));
            }else{
                dispatch(updateUserFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteUser = (userId) => {
    return dispatch => {
        dispatch(deletingUser);
        usersApi.deleteCommentApi(userId).then(data => {
            dispatch(deleteUserSuccess(userId));
        }).catch(error => {
            if (error.response){
                dispatch(deleteUserFail(error.response.data));
            }else{
                dispatch(deleteUserFail("Unexpected error occured"));
            }
        })
    }
}

export const toggleUser = (id, active) => {
    return dispatch => {
        dispatch(updatingUser);
        usersApi.toggleActiveUserApi(id, active).then(data => {
            dispatch(toggleActiveUserApi(id, active));
        }).catch(error => {
            if (error.response) {
                dispatch(updateUserFail(error.response));
            }else {
                dispatch(updateUserFail("Unexpected error occured"));
            }
        })
    }
}
