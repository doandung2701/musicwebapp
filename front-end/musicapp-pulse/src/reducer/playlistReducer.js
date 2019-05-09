import {
    GETTING_PLAYLISTS_BY_USER_ID, GET_PLAYLISTS_BY_USER_ID_SUCCESS,
    GET_PLAYLISTS_BY_USER_ID_FAIL, GETTING_PLAYLISTS_BY_ID, GET_PLAYLISTS_BY_ID_SUCCESS,
    GET_PLAYLISTS_BY_ID_FAIL, CREATING_PLAYLIST, CREATE_PLAYLIST_SUCCESS, CREATE_PLAYLIST_FAIL,
    EDITING_PLAYLIST, EDIT_PLAYLIST_SUCCESS, EDIT_PLAYLIST_FAIL, DELETING_PLAYLIST,
    DELETE_PLAYLIST_FAIL, DELETE_PLAYLIST_SUCCESS, ADDING_SONGS_TO_PLAYLIST,
    ADD_SONGS_TO_PLAYLIST_SUCCESS, ADD_SONGS_TO_PLAYLIST_FAIL, REMOVING_SONGS_FROM_PLAYLIST, REMOVE_SONGS_FROM_PLAYLIST_SUCCESS, REMOVE_SONGS_FROM_PLAYLIST_FAIL
} from "../constants/constants";
import { stat } from "fs";

const initialState = {
    playLists: [],
    singlePlayList: {},
    isGettingplayLists: false,
    isGettingplayList: false,
    isDeletingPlayList: false,
    isCreatingPlaylist: false,
    isEditingPlaylist: false,
    isAddingSongs: false,
    isRemovingSongs: false,
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
        case CREATING_PLAYLIST:
            return {
                ...state,
                isCreatingPlaylist: true
            }
        case CREATE_PLAYLIST_SUCCESS:
            return {
                ...state,
                isCreatingPlaylist: false,
                playLists: [...state.playLists, action.playList]
            }
        case CREATE_PLAYLIST_FAIL:
            return {
                ...state,
                isCreatingPlaylist: false
            }
        case EDITING_PLAYLIST:
            return {
                ...state,
                isEditingPlaylist: true
            }
        case EDIT_PLAYLIST_SUCCESS:
            let playLists = [...state.playLists];
            playLists.forEach(value => {
                if (value.id === action.playList.id) {
                    value.name = action.playList.name;
                    value.description = action.playList.description;
                    value.thumbnail = action.playList.thumbnail
                }
            })
            return {
                ...state,
                isEditingPlaylist: false,
                playLists
            }
        case EDIT_PLAYLIST_FAIL:
            return {
                ...state,
                isEditingPlaylist: false
            }
        case DELETING_PLAYLIST:
            return {
                ...state,
                isDeletingPlayList: true
            }
        case DELETE_PLAYLIST_SUCCESS:
            playLists = state.playLists.filter(value => {
                return value.id !== action.id
            })
            return {
                ...state,
                isDeletingPlayList: false,
                playLists
            }
        case DELETE_PLAYLIST_FAIL:
            return {
                ...state,
                isDeletingPlayList: false
            }
        case ADDING_SONGS_TO_PLAYLIST:
            return {
                ...state,
                isAddingSongs: true
            }
        case ADD_SONGS_TO_PLAYLIST_SUCCESS:
            let temp = null;
            for (let item of action.playLists) {
                if (item.id === state.singlePlayList.id) {
                    temp = { ...item };
                    break;
                }
            }
            console.log("temp", temp);
            if (!temp)
                return {
                    ...state,
                    isAddingSongs: false,
                }
            else {
                return {
                    ...state,
                    isAddingSongs: false,
                    singlePlayList: temp
                }
            }
        case ADD_SONGS_TO_PLAYLIST_FAIL:
            return {
                ...state,
                isAddingSongs: false
            }

        case REMOVING_SONGS_FROM_PLAYLIST:
            return {
                ...state,
                isRemovingSongs: true
            }
        case REMOVE_SONGS_FROM_PLAYLIST_SUCCESS:
            temp = null;
            if (action.playList.id === state.singlePlayList.id) {
                temp = { ...action.playList };
            }
            if (!temp)
                return {
                    ...state,
                    isRemovingSongs: false,
                }
            else {
                return {
                    ...state,
                    isRemovingSongs: false,
                    singlePlayList: temp
                }
            }
        case REMOVE_SONGS_FROM_PLAYLIST_FAIL:
            return {
                ...state,
                isRemovingSongs: false
            }
        default: return state;
    }
}