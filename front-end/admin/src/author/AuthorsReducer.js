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
        default:
            return state
    }
}