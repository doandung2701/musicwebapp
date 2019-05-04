import { GETTING_ALL_SINGERS_PAGING, GET_ALL_SINGERS_PAGING_SUCCESS, GET_ALL_SINGERS_PAGING_FAIL, WIPE_FETCH_ON_SCROLL_SINGERS, GETTING_SINGER_BY_ID, GET_SINGER_BY_ID_SUCCESS, GET_SINGER_BY_ID_FAIL, GET_TOP_POPULAR_BY_SINGER_SUCCESS } from "../constants/constants";

const initialState = {
    list: [],
    singer: {},
    topPopular: [],
    isGettingSinger: false,
    isGetting: false,
    error: false
}

export const artistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_ALL_SINGERS_PAGING:
            return {
                ...state,
                isGetting: true,
                error: false
            }
        case GET_ALL_SINGERS_PAGING_SUCCESS:
            return {
                ...state,
                isGetting: false,
                list: [...state.list, ...action.singers],
            }
        case GET_ALL_SINGERS_PAGING_FAIL:
            return {
                ...state,
                isGetting: false,
                error: true
            }
        case WIPE_FETCH_ON_SCROLL_SINGERS:
            return {
                ...state,
                list: []
            }
        case GETTING_SINGER_BY_ID:
            return {
                ...state,
                isGettingSinger: true
            }
        case GET_SINGER_BY_ID_SUCCESS:
            return {
                ...state,
                singer: action.singer,
                isGettingSinger: false
            }
        case GET_SINGER_BY_ID_FAIL:
            return {
                ...state,
                isGettingSinger: false
            }
        case GET_TOP_POPULAR_BY_SINGER_SUCCESS: 
            return {
                ...state,
                topPopular: action.songs
            }
        default:
            return state;
    }
}