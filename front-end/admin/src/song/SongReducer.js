import { GETTING_SONGS_BY_SINGER_ID, GET_SONGS_BY_SINGER_ID_SUCCESS, GET_SONGS_BY_SINGER_ID_FAIL } from "../constants";

var initialState = {
    songList: [],
    isGettingSongList: false,
    error: null
}

export const songListReducer = (state = initialState, action) => {
    switch(action.type){
        case GETTING_SONGS_BY_SINGER_ID:
            return {
                ...state,
                isGettingSongList: true
            }
        case GET_SONGS_BY_SINGER_ID_SUCCESS:
        return {
            ...state,
            isGettingSongList: false,
            songList: action.songs
        }
        case GET_SONGS_BY_SINGER_ID_FAIL:
            return {
                ...state,
                isGettingSongList: false,
                error: action.error
            }
        default: return state;
    }
}

