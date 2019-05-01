import * as actions from '../constants/index';
import * as playListApi from '../api/playlistApi';
import { PLAYLIST_SHOW_MODAL, PLAYLIST_CLOSE_MODAL } from "./PlayListConstants";
import { SINGER_CLOSE_MODAL } from '../singer/SingerConstants';
export const openModal = (data = {
    id: 0,
    name: '',
    thumbnail: '',
    description: '',
    user: null,
    playlistSong: [],
})=> ({
    type: PLAYLIST_SHOW_MODAL,
    payload: data
})

export const closeModal = () => ({
    type: PLAYLIST_CLOSE_MODAL
})

const gettingPlayLists = () => ({
    type: actions.GETTING_PLAYLISTS
})

const getPlayListsSuccess = (playlists) => ({
    type: actions.GET_PLAYLISTS_SUCCESS,
    payload: playlists
})

const getPlayListFail = (error) => ({
    tyope: actions.GET_PLAYLISTS_FAIL,
    error
})

const creatingPlayList = () => ({
    type: actions.CREATING_PLAYLIST
})

const createPLayListSuccess = (playlist) => ({
    type: actions.CREATE_PLAYLIST_SUCCESS,
    payload: playlist
})

const createPlayListFail = (error) => ({
    type: actions.CREATE_PLAYLIST_FAIL,
    error
})

const deletingPLayList = () => ({
    type: actions.DELETING_PLAYLIST
})

const deletePlayListSuccess = (playlist) => ({
    type: actions.DELETE_PLAYLIST_SUCCESS,
    payload: playlist
})

const deletePlayListFail = (error) => ({
    type: actions.DELETE_PLAYLIST_FAIL,
    error
})

const updatingPlayList = () => ({
    type: actions.UPDATING_PLAYLIST
})

const updatePlayListSuccess = (playlist) => ({
    type: actions.UPDATE_PLAYLIST_SUCCESS,
    payload: playlist
})

const updatePlayListFail = (error) => ({
    type: actions.UPDATE_PLAYLIST_FAIL,
    error
})

export const getAllPlayLists = () => {
    return dispatch => {
        dispatch(gettingPlayLists());
        playListApi.getAllPlayListApi().then(data => {
            dispatch(getPlayListsSuccess(data.data));
        }).catch(error => {
            console.log(error);
            
            if (error.respone) {
                dispatch(getPlayListFail(error.respone.data));
            }else {
                dispatch(getPlayListFail("Unexpected error occured"))
            }
        })
    }
}

export const createPlayList = (playlist) => {
    return dispatch => {
        dispatch(creatingPlayList());
        playListApi.createPlayListApi(playlist).then(data=> {
            dispatch(createPLayListSuccess(playlist));
        }).catch(error => {
            if (error.response){
                dispatch(createPlayListFail(error.response.data));
            }else{
                dispatch(createPlayListFail("Unexpected error occured"));
            }
        })
    }
}

export const updatePlayList = (id, playlistDetail) => {
    return dispatch => {
        dispatch(updatingPlayList());
        playListApi.updatePlayListApi(id, playlistDetail).then((data) => {
            dispatch(updatePlayListSuccess(data.data));
        }).catch(error => {
            if (error.response){
                dispatch(updatePlayListFail(error.response.data));
            }else{
                dispatch(updatePlayListFail("Unexpected error occured"));
            }
        })
    }
}

export const deletePlayList = (playlist) => {
    return dispatch => {
        dispatch(deletingPLayList());
        playListApi.deletePlayListApi(playlist).then((data) => {
            dispatch(deletePlayListSuccess(playlist));
        }).catch(error => {
            if (error.response){
                dispatch(deletePlayListFail(error.response.data));
            }else{
                dispatch(deletePlayListFail("Unexpected error occured"));
            }
        })
    }
}