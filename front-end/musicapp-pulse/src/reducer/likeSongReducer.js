import { GETTING_LIKE_SONG_BY_USER_ID, GET_LIKE_SONG_BY_USER_ID_SUCCESS, GET_LIKE_SONG_BY_USER_ID_FAIL, WIPE_FETCH_ON_SCROLL_LIKE_SONGS } from "../constants/constants";

const initialState = {
    list: [],
    isGetting: false,
    error: false
}

export const likeSongReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_LIKE_SONG_BY_USER_ID:
            return {
                ...state,
                isGetting: true,
                error: false
            }
        case GET_LIKE_SONG_BY_USER_ID_SUCCESS:
        if(action.songs){
            return {
                ...state,
                isGetting: false,
                list: [...state.list,...action.songs],
            }
           
        }else{
            return {
                ...state,
                isGetting: false,
            }
        }
           
        case GET_LIKE_SONG_BY_USER_ID_FAIL:
            return {
                ...state,
                isGetting: false,
                error: true
            }
            case WIPE_FETCH_ON_SCROLL_LIKE_SONGS:
            return {
                ...state,
                list: []
            }
        default:
            return state;
    }
}