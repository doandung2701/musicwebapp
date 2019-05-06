import { GETTING_ALBUMS_BY_SINGER_ID, GET_ALBUMS_BY_SINGER_ID_SUCCESS, GET_ALBUMS_BY_SINGER_ID_FAIL, GETTING_ALBUMS_BY_ID, GET_ALBUMS_BY_ID_SUCCESS, GET_ALBUMS_BY_ID_FAIL } from "../constants/constants";

const initialState = {
    albums: [],
    singleAlbum: {},
    isGettingAlbums: false,
    isGettingAlbum: false,
    error: false
}

export const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_ALBUMS_BY_SINGER_ID:
            return {
                ...state,
                isGettingAlbums: true
            }
        case GET_ALBUMS_BY_SINGER_ID_SUCCESS:
            return {
                ...state,
                isGettingAlbums: false,
                albums: action.albums
            }
        case GET_ALBUMS_BY_SINGER_ID_FAIL:
            return {
                ...state,
                isGettingAlbums: false
            }
        case GETTING_ALBUMS_BY_ID:
            return {
                ...state,
                isGettingAlbum: true
            }
        case GET_ALBUMS_BY_ID_SUCCESS:
            return {
                ...state,
                isGettingAlbum: false,
                singleAlbum: action.album
            }
        case GET_ALBUMS_BY_ID_FAIL:
            return {
                ...state,
                isGettingAlbum: false
            }
        default: return state;
    }
}