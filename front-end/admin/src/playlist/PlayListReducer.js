import * as actions from "../constants";
import { PLAYLIST_SHOW_MODAL, PLAYLIST_CLOSE_MODAL } from "./PlayListConstants";
import { openNotificationWithIcon } from "../common/notification";

//PlayList Modal Reducer
var initialStateModal = {
    isShow: false,
    playList: {
        id: 0,
        name: '',
        thumbnail: '',
        description: '',
        user: 1,
        playListSong: [],
    },
    idLoading: false,
    error: null
}

export const playListModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case PLAYLIST_SHOW_MODAL:
            return {
                ...state,
                isShow: true,
                playList: action.payload
            }
        case PLAYLIST_CLOSE_MODAL:
            return {
                ...state,
                isShow: false
            }
        case actions.UPDATING_PLAYLIST:
            return {
                ...state,
                isLoading: true
            }
        case actions.UPDATE_PLAYLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actions.UPDATE_COMMENT_FAIL: 
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actions.CREATING_PLAYLIST: {
            return {
                ...state,
                isLoading: true
            }

        }
        case actions.CREATE_PLAYLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actions.CREATE_PLAYLIST_FAIL: {
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


var initialState = {
    playListList: [],
    isGettingPlayListList: false,
    isLoadingDelete: false,
    error: null
}

export const playListListReducer = (state = initialState, action)=> {
    switch (action.type) {
        case actions.GETTING_PLAYLISTS:
            return {
                ...state,
                isGettingPlayListList: true
            }
        case actions.GET_PLAYLISTS_SUCCESS:
            return {
                ...state,
                isGettingPlayListList: false,
                playListList: action.payload
            }
        case actions.GET_PLAYLISTS_FAIL:
            return {
                ...state,
                isGettingPlayListList: false,
                error : action.error
            }
        case actions.CREATING_PLAYLIST:
            return {
                ...state
            }
        case actions.CREATE_PLAYLIST_SUCCESS:
            openNotificationWithIcon('success', 'PlayList', 'Create PlayList success');
            console.log(action.payload);
            return {
                ...state,
                playListList: [...state.playListList, action.payload] //trả về mảng với list ban đầu với, phần tử mới thêm vào
            }
        case actions.CREATE_PLAYLIST_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actions.DELETING_PLAYLIST:
            return {
                ...state,
                isLoadingDelete: true,
            }
        case actions.DELETE_PLAYLIST_SUCCESS:
            var playListListResult = state.playListList.filter(item => item.id != action.payload)
            openNotificationWithIcon('success', 'PlayList', 'Delete PlayList success');
            return {
                ...state,
                playListList: playListListResult,
                isLoadingDelete: false,
            }
        case actions.DELETE_PLAYLIST_FAIL:
            openNotificationWithIcon('error', 'PlayList', 'Delete PlayList error');
            return {
                ...state,
                isLoadingDelete: false,
                error: action.error
            }
            case actions.UPDATING_PLAYLIST:
            return {
                ...state,
            }
        case actions.UPDATE_PLAYLIST_SUCCESS:
            openNotificationWithIcon('success', 'PlayList', 'Update PlayList success');
            var index = state.playListList.findIndex(item => item.id == action.payload.id);
            let playListNew = state.playListList;
            playListNew[index] = action.payload;
            return {
                ...state,
                playListList: playListNew
            }
        case actions.UPDATE_COMMENT_FAIL: 
        openNotificationWithIcon('error', 'PlayList', 'Update PlayList error');
            return {
                ...state,
            }
        default: 
            return state
    }
}