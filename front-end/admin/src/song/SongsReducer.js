import * as actionConstants from '../constants/index';
import {SONG_SHOW_MODAL ,SONG_CLOSE_MODAL} from './SongsConstants';
import { openNotificationWithIcon } from "../common/notification";

const initialStateModal = {
    song: {
        songId: 0,
        songName: '',
        briefDesciption: '',
        authors: [],
        singers: [],
        categories: [],
        songSrc: null,
        thumbnail: null
    },
    isLoading: false,
    error: null
}

export const songModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case SONG_SHOW_MODAL:
            return {
                ...state,
                isShow: true,
                song: action.payload
            }
        case SONG_CLOSE_MODAL:
            return {
                ...state,
                isShow: false
            }
        case actionConstants.UPDATING_SONG:
            return {
                ...state,
                isLoading: true
            }
        case actionConstants.UPDATE_SONG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.UPDATE_SONG_FAIL: 
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionConstants.CREATING_SONG: {
            return {
                ...state,
                isLoading: true
            }

        }
        case actionConstants.CREATE_SONG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.CREATE_SONG_FAIL: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        default:
            return state;
    }
}

const initialSate = {
    songList: [],
    isGettingSongList: false,
    isLoadingDelete: false,
    isUpdating: false,
    error: null
}

export const songListReducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionConstants.GETTING_SONGS:
            return {
                ...state,
                isGettingSongList: true
            }
        case actionConstants.GET_SONGS_SUCCESS:
            return {
                ...state,
                isGettingSongList: false,
                songList: action.payload
            }
        case actionConstants.GET_SONGS_FAIL:
            return {
                ...state,
                isGettingSongList: false,
                error: state.error
            }
        case actionConstants.UPLOAD_SONG_SUCCESS:
        openNotificationWithIcon('success', 'Song', 'Upload Song success');
            return {
                ...state,
                songList: [action.song, ...state.songList]
            }
        case actionConstants.UPLOAD_SONG_FAIL: 
        openNotificationWithIcon('error', 'Song', 'Upload Song error');
            return {
                ...state,
            }
        case actionConstants.DELETE_SONG_SUCCESS:
            openNotificationWithIcon('success', 'Song', 'Delete Song success');
            let list = state.songList.filter(value => {
                return value.songId !== action.song.songId
            })
            return {
                ...state,
                songList: list
            }
        case actionConstants.DELETE_SONG_FAIL: 
        openNotificationWithIcon('error', 'Song', 'DELETE Song error');
            return {
                ...state,
            }
        case actionConstants.UPDATE_SONG_SUCCESS:
            openNotificationWithIcon('success', 'Song', 'Update Song success');
            var index = state.songList.findIndex(item => item.songId == action.payload.songId);
            let songListNew = state.songList;
            songListNew[index] = action.payload;
            return {
                ...state,
                playListList: songListNew
            }
        case actionConstants.UPDATE_SONG_FAIL: 
        openNotificationWithIcon('error', 'Song', 'Update Song error');
            return {
                ...state,
            }
        case actionConstants.CREATING_PLAYLIST:
            return {
                ...state
            }
        case actionConstants.CREATE_PLAYLIST_SUCCESS:
            openNotificationWithIcon('success', 'Song', 'Create Song success');
            console.log(action.payload);
            return {
                ...state,
                playListList: [...state.playListList, action.payload] //trả về mảng với list ban đầu với, phần tử mới thêm vào
            }
        case actionConstants.CREATE_PLAYLIST_FAIL:
            return {
                ...state,
                error: action.error
            }
        default: 
            return state
    }
}