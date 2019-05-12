import { GETTING_PLAYLISTS_BY_USER_ID, GET_PLAYLISTS_BY_USER_ID_SUCCESS, GET_PLAYLISTS_BY_USER_ID_FAIL, GETTING_PLAYLISTS_BY_ID, GET_PLAYLISTS_BY_ID_SUCCESS, GET_PLAYLISTS_BY_ID_FAIL, CREATING_PLAYLIST, CREATE_PLAYLIST_SUCCESS, CREATE_PLAYLIST_FAIL, EDITING_PLAYLIST, EDIT_PLAYLIST_SUCCESS, EDIT_PLAYLIST_FAIL, DELETING_PLAYLIST, DELETE_PLAYLIST_SUCCESS, DELETE_PLAYLIST_FAIL, ADDING_SONGS_TO_PLAYLIST, ADD_SONGS_TO_PLAYLIST_SUCCESS, ADD_SONGS_TO_PLAYLIST_FAIL, REMOVING_SONGS_FROM_PLAYLIST, REMOVE_SONGS_FROM_PLAYLIST_SUCCESS, REMOVE_SONGS_FROM_PLAYLIST_FAIL } from "../constants/constants";
import { getPlaylistsByUserIdApi, getPlaylistsByIdApi, createPlaylistApi, editPlaylistApi, deletePlayListApi, addSongsToPlaylistApi, removeSongsFromPlaylistApi } from "../Api/PlayListApi";
import { message } from "antd";

const gettingPlaylistsByUserId = () => ({
    type: GETTING_PLAYLISTS_BY_USER_ID
})

const getPlaylistsByUserIdSuccess = (playLists) => ({
    type: GET_PLAYLISTS_BY_USER_ID_SUCCESS,
    playLists
})

const getPlaylistsByUserIdFail = () => ({
    type: GET_PLAYLISTS_BY_USER_ID_FAIL
})

const gettingPlaylistsById = () => ({
    type: GETTING_PLAYLISTS_BY_ID
})

const getPlaylistsByIdSuccess = (playList) => ({
    type: GET_PLAYLISTS_BY_ID_SUCCESS,
    playList
})

const getPlaylistsByIdFail = () => ({
    type: GET_PLAYLISTS_BY_ID_FAIL
})

const creatingPlaylist = () => ({
    type: CREATING_PLAYLIST
})

const createPlaylistSuccess = (playList) => ({
    type: CREATE_PLAYLIST_SUCCESS,
    playList
})

const createPlaylistFail = () => ({
    type: CREATE_PLAYLIST_FAIL
})


const edittingPlaylist = () => ({
    type: EDITING_PLAYLIST
})

const editPlaylistSuccess = (playList) => ({
    type: EDIT_PLAYLIST_SUCCESS,
    playList
})

const editPlaylistFail = () => ({
    type: EDIT_PLAYLIST_FAIL
})

const deletingPlaylist = () => ({
    type: DELETING_PLAYLIST
})

const deletePlaylistSuccess = (id) => ({
    type: DELETE_PLAYLIST_SUCCESS,
    id
})

const deletePlaylistFail = () => ({
    type: DELETE_PLAYLIST_FAIL
})

const addingSongsToPlaylist = () => ({
    type: ADDING_SONGS_TO_PLAYLIST
})

const addSongsToPlaylistSuccess = (playLists) => ({
    type: ADD_SONGS_TO_PLAYLIST_SUCCESS,
    playLists
})

const addSongsToPlaylistFail = () => ({
    type: ADD_SONGS_TO_PLAYLIST_FAIL
})

const removingSongsFromPlaylist = () => ({
    type: REMOVING_SONGS_FROM_PLAYLIST
})

const removeSongsFromPlaylistSuccess = (playList) => ({
    type: REMOVE_SONGS_FROM_PLAYLIST_SUCCESS,
    playList
})

const removeSongsFromPlaylistFail = () => ({
    type: REMOVE_SONGS_FROM_PLAYLIST_FAIL
})

export const removeSongsFromPlaylist = (payload) => {
    return async dispatch => {
        dispatch(removingSongsFromPlaylist());
        try {
            let data = await removeSongsFromPlaylistApi(payload);
            dispatch(removeSongsFromPlaylistSuccess(data.data));
            message.success("Removed");
        } catch (err) {
            dispatch(removeSongsFromPlaylistFail());
            message.error("An error occured :( "+err.response?err.response.data:err);
        }
    }
}

export const addSongsToPlaylist = (payload) => {
    return async dispatch => {
        dispatch(addingSongsToPlaylist());
        try {
            let data = await addSongsToPlaylistApi(payload);
            dispatch(addSongsToPlaylistSuccess(data.data));
            console.log("list", data.data);
            message.success("Added");
        } catch (err) {
            dispatch(addSongsToPlaylistFail());
            message.error("An error occured :( " + err.response && err.response.data);
        }
    }
}

export const editPlaylist = (payload) => {
    return async dispatch => {
        dispatch(edittingPlaylist());
        try {
            let data = await editPlaylistApi(payload);
            dispatch(editPlaylistSuccess(data.data));
            message.success("Your playlist has been modified")
        } catch (err) {
            dispatch(editPlaylistFail());
            message.error("An error occured :( " + err.response && err.response.data);
        }
    }
}

export const deletePlaylist = (id) => {
    return async dispatch => {
        dispatch(deletingPlaylist());
        try {
            let data = await deletePlayListApi(id);
            dispatch(deletePlaylistSuccess(data.data));
            message.success("Your playlist has been deleted")
        } catch (err) {
            dispatch(deletePlaylistFail());
            message.error("An error occured :( " + err.response && err.response.data);
        }
    }
}

export const createPlaylist = (payload) => {
    return async dispatch => {
        dispatch(creatingPlaylist());
        try {
            let data = await createPlaylistApi(payload);
            dispatch(createPlaylistSuccess(data.data));
            message.success("Your playlist has been created")
        } catch (err) {
            dispatch(createPlaylistFail());
            message.error("An error occured :( " + err.response && err.response.data);
        }
    }
}

export const getPlaylistsByUserId = (userId) => {
    return async dispatch => {
        dispatch(gettingPlaylistsByUserId());
        try {
            let data = await getPlaylistsByUserIdApi(userId);
            dispatch(getPlaylistsByUserIdSuccess(data.data));
        } catch (err) {
            dispatch(getPlaylistsByUserIdFail());
        }
    }
}

export const getPlaylistsById = (id) => {
    return async dispatch => {
        dispatch(gettingPlaylistsById());
        try {
            let data = await getPlaylistsByIdApi(id);
            dispatch(getPlaylistsByIdSuccess(data.data));
        } catch (err) {
            dispatch(getPlaylistsByIdFail());
        }
    }
}