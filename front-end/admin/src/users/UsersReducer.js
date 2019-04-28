import * as actionConstants from '../constants/index'

const initialStateModal = {
    users: {
        id: 0,
        name: '',
        email: '',
        imageUrl: '',
        emailVerified: '',
        provider: '',
    },
    isLoading: false,
    error: null
}

const initialSate = {
    userList: [],
    isGettingUserList: false,
    isLoadingDelete: false,
    isUpdating: false,
    error: null
}

export const userListReducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionConstants.GETTING_USERS:
            return {
                ...state,
                isGettingUserList: true
            }
        case actionConstants.GET_USERS_SUCCESS:
            let payload = [...action.payload];
            payload.forEach((data) => {
                if(data.imageUrl === undefined || data.imageUrl === null)
                    data.imageUrl = 'No Data';
                if(data.emailVerified === true) {
                    data.emailVerified = 'true';
                }else {
                    data.emailVerified = 'false';
                }
            })
            return {
                ...state,
                isGettingUserList: false,
                userList: action.payload
            }
        case actionConstants.GET_USER_BY_ID_FAIL:
            return {
                ...state,
                isGettingUserList: false,
                error: state.error
            }
        case actionConstants.UPDATING_USER:
            return {
                ...state,
                isUpdating: false,
            }
        case actionConstants.UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                userList: action.payload
            }
        case actionConstants.UPDATE_COMMENT_FAIL: 
            return {
                ...state,
                isUpdating: false,
                error: action.error
            }
        case actionConstants.TOGGLE_USER_EMAIL:
            var userListResult = [...state.userList] ;
            userListResult.forEach((data)=> {
                if(data.id == action.id) {
                    data.emailVerified = data.emailVerified == 'true' ? "false" : "true"
                }
            })
            return {
                ...state,
                isUpdating: false,
                userList: userListResult
            }
        default:
            return state
    }
}