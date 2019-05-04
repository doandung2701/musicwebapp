import { SEARCHING_SONGS_AND_SINGERS, SEARCH_SONGS_AND_SINGERS_SUCCESS, SEARCH_SONGS_AND_SINGERS_FAIL } from "../constants/constants";

const initialState = {
    songs: [],
    singers: [],
    isSearching: false,
    error: false
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCHING_SONGS_AND_SINGERS:
            return {
                ...state,
                isSearching: true,
                error: false
            }
        case SEARCH_SONGS_AND_SINGERS_SUCCESS:
            return {
                ...state,
                songs: action.data[0].data,
                singers: action.data[1].data,
                isSearching: false
            }
        case SEARCH_SONGS_AND_SINGERS_FAIL:
            return {
                ...state,
                isSearching: false,
                error: true
            }
        default: return state;
    }
}