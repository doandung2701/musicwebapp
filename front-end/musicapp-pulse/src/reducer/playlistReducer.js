import { GETTING_PLAYLISTS_BY_USER_ID, GET_PLAYLISTS_BY_USER_ID_SUCCESS, GET_PLAYLISTS_BY_USER_ID_FAIL, GETTING_PLAYLISTS_BY_ID, GET_PLAYLISTS_BY_ID_SUCCESS, GET_PLAYLISTS_BY_ID_FAIL } from "../constants/constants";

const initialState = {
    playLists: [],
    singlePlayList: {},
    isGettingplayLists: false,
    isGettingplayList: false,
    error: false
}

export const playListsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_PLAYLISTS_BY_USER_ID:
            return {
                ...state,
                isGettingplayLists: true
            }
        case GET_PLAYLISTS_BY_USER_ID_SUCCESS:
            return {
                ...state,
                isGettingplayLists: false,
                playLists: action.playLists
            }
        case GET_PLAYLISTS_BY_USER_ID_FAIL:
            return {
                ...state,
                isGettingplayLists: false
            }
        case GETTING_PLAYLISTS_BY_ID:
            return {
                ...state,
                isGettingplayList: true
            }
        case GET_PLAYLISTS_BY_ID_SUCCESS:
            return {
                ...state,
                isGettingplayList: false,
                singlePlayList: action.playList
            }
        case GET_PLAYLISTS_BY_ID_FAIL:
            return {
                ...state,
                isGettingplayList: false
            }
        default: return state;
    }
}