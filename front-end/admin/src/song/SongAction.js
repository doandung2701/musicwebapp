import { GETTING_SONGS_BY_SINGER_ID,GET_ALL_SONGS_FAIL, GET_SONGS_BY_SINGER_ID_SUCCESS, GET_SONGS_BY_SINGER_ID_FAIL } from "../constants";
import { findAllSongsBySingerIdApi } from "../api/singerApi";
import { GETTING_ALL_SONGS, GET_ALL_SONGS_SUCCESS, GETTING_SONG_BY_ID, GET_SONG_BY_ID_SUCCESS, GET_SONG_BY_ID_FAIL, GETTING_SONGS_BY_CATEGORY_ID, GET_SONGS_BY_CATEGORY_ID_SUCCESS, GET_SONGS_BY_CATEGORY_ID_FAIL, GET_SONGS_BY_AUTHOR_ID_FAIL, GET_SONGS_BY_AUTHOR_ID_SUCCESS, GETTING_SONGS_BY_AUTHOR_ID, DELETING_SONG, DELETE_SONG_SUCCESS, DELETE_SONG_FAIL, UPDATING_SONG, UPDATE_SONG_SUCCESS, UPDATE_SONG_FAIL, CREATING_SONGS, CREATE_SONGS_SUCCESS, CREATE_SONGS_FAIL } from "./SongConstants";
import { getAllSongsApi, getSongByIdApi, findAllSongsByAuthorIdApi, findAllSongsByCategoryIdApi, deleteSongApi, updateSongApi, addSongsApi } from "../api/songApi";

const gettingSongsBySingerId = ()=>({
    type: GETTING_SONGS_BY_SINGER_ID
})

const getSongsBySingerIdSuccess = (songs)=>({
    type: GET_SONGS_BY_SINGER_ID_SUCCESS,
    songs
})

const getSongsBySingerIdFail = (error)=>({
    type: GET_SONGS_BY_SINGER_ID_FAIL,
    error
})

const gettingSongsByCategoryId = ()=>({
    type: GETTING_SONGS_BY_CATEGORY_ID
})

const getSongsByCategoryIdSuccess = (songs)=>({
    type: GET_SONGS_BY_CATEGORY_ID_SUCCESS,
    songs
})

const getSongsByCategoryIdFail = (error)=>({
    type: GET_SONGS_BY_CATEGORY_ID_FAIL,
    error
})

const gettingSongsByAuthorId = ()=>({
    type: GETTING_SONGS_BY_AUTHOR_ID
})

const getSongsByAuthorIdSuccess = (songs)=>({
    type: GET_SONGS_BY_AUTHOR_ID_SUCCESS,
    songs
})

const getSongsByAuthorIdFail = (error)=>({
    type: GET_SONGS_BY_AUTHOR_ID_FAIL,
    error
})

const gettingAllSongs = ()=>({
    type: GETTING_ALL_SONGS
})

const getAllSongsSuccess = (songs) => ({
    type: GET_ALL_SONGS_FAIL,
    payload: songs
})

const getAllSongsFail = (error) => ({
    type: GET_ALL_SONGS_SUCCESS,
    error
})

const gettingSongById = () => ({
    type: GETTING_SONG_BY_ID
})

const getSongByIdSuccess = (song) => ({
    type: GET_SONG_BY_ID_SUCCESS,
    payload: song
})

const getSongByIdFail = (error) => ({
    type: GET_SONG_BY_ID_FAIL,
    error
})

const deletingSong = () => ({
    type: DELETING_SONG
})

const deleteSongSuccess = (data) => ({
    type: DELETE_SONG_SUCCESS,
    payload: data
})

const deleteSongFail = (error) => ({
    type: DELETE_SONG_FAIL,
    error
})

const updatingSong = () => ({
    type: UPDATING_SONG
})

const updateSongSuccess = (song) => ({
    type: UPDATE_SONG_SUCCESS,
    payload: song
})

const updateSongFail = error => ({
    type: UPDATE_SONG_FAIL,
    error
})

const creatingSong = () => ({
    type: CREATING_SONGS
})

const createSongSuccess = (song) => ({
    type: CREATE_SONGS_SUCCESS,
    payload: song
})

const createSongFail = (error) => ({
    type: CREATE_SONGS_FAIL,
    error
})

export const getSongsBySingerId = (id)=>{
    return dispatch=>{
        dispatch(gettingSongsBySingerId());
        findAllSongsBySingerIdApi(id).then(data=>{
            dispatch(getSongsBySingerIdSuccess(data.data))
        }).catch(error=>{
            error.reponse?dispatch(getSongsBySingerIdFail(error.reponse.data)):
            dispatch("Unexpected error occured");
        })
    }
}

export const getSongsByAuthorId = (id)=>{
    return dispatch=>{
        dispatch(gettingSongsByCategoryId());
        findAllSongsByCategoryIdApi(id).then(data=>{
            dispatch(getSongsByCategoryIdSuccess(data.data))
        }).catch(error=>{
            error.reponse?dispatch(getSongsByCategoryIdFail(error.reponse.data)):
            dispatch("Unexpected error occured");
        })
    }
}

export const getSongsByCategoryId = (id)=>{
    return dispatch=>{
        dispatch(gettingSongsByAuthorId());
        findAllSongsByAuthorIdApi(id).then(data=>{
            dispatch(getSongsByAuthorIdSuccess(data.data))
        }).catch(error=>{
            error.reponse?dispatch(getSongsByAuthorIdFail(error.reponse.data)):
            dispatch("Unexpected error occured");
        })
    }
}

export const getAllSongs = () => {
    return dispatch => {
        dispatch(gettingAllSongs());
        getAllSongsApi().then(data => {
            dispatch(getAllSongsSuccess(data.data))
        }).catch(error => {
            if (error.response/*trong truong hop server khong sap*/) {
                /*ở chỗ này có thể gọi thêm alert để thông báo lỗi
                error.response.data thì
               không cần phải cho thêm error vào dispatch, còn cho error vào
               dispatch thì thông báo lỗi ở component */
                dispatch(getAllSongsFail(error.response.data));
            } else {/*truong hop server sap*/
                /*ở chỗ này có thể gọi thêm alert để thông báo lỗi thì
                    không cần phải cho thêm error vào dispatch, còn cho error vào
                    dispatch thì thông báo lỗi ở component */
                dispatch(getAllSongsFail("Unexpected error occured"));
            }
        })
    }
}

export const getScoreTypeById = (songId) => {
    return dispatch => {
        dispatch(gettingSongById());
        getSongByIdApi(songId).then(data => {
            dispatch(getSongByIdSuccess(data.data));
        }).catch(error => {
            if (error.response) {
                dispatch(getSongByIdFail(error.response.data));
            } else {
                dispatch(getSongByIdFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteSong = (songId) => {
    return dispatch => {
        dispatch(deletingSong());
        deleteSongApi(songId).then(data => {
            dispatch(deleteSongSuccess(songId));
        }).catch(error => {
            if (error.response) {
                dispatch(deleteSongFail(error.response.data));
            } else {
                dispatch(deleteSongFail("Unexpected error occured"));
            }
        })
    }
}

export const updateSong = (songId, songDetail) => {
    /*scoreTypeDetail gửi lên có các thuộc tính trong class ScoreType ở backend */
    return dispatch => {
        dispatch(updatingSong());
        updateSongApi(songId, songDetail).then(data => {
            dispatch(updateSongSuccess(data.data));//trả về scoreType để hiển thị luôn, đỡ phải fetch lại
        }).catch(error => {
            if (error.response) {
                dispatch(updateSongFail(error.response.data));
            } else {
                dispatch(updateSongFail("Unexpected error occured"));
            }
        })
    }
}

export const createSong = (song) => {
    /*scoreType gửi lên có các thuộc tính trong class ScoreType ở backend */
    return dispatch => {
        dispatch(creatingSong());
        addSongsApi(song).then(data => {
            dispatch(createSongSuccess(data.data));//trả về để hiển thị luôn, hoặc có thể fetch lại toàn bộ list nếu muốn
        }).catch(error => {
            if (error.response) {
                dispatch(createSongFail(error.response.data));
            } else {
                dispatch(createSongFail("Unexpected error occured"));
            }
        })
    }
}



