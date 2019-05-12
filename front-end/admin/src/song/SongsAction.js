import * as actionConstants from "../constants/index";
import * as songApi from "../api/songApi";
import {SONG_CLOSE_MODAL, SONG_SHOW_MODAL} from "../song/SongsConstants";
export const openModal = (data = {
    songId: 0,
    songName: '',
    briefDesciption: '',
    authors: [],
    singers: [],
    categories: [],
    songSrc: null,
    thumbnail: null
})=> ({
    type: SONG_SHOW_MODAL,
    payload: data
})


const gettingSongs = () => ({
    type: actionConstants.GETTING_SONGS
})

const getSongSuccess = (users) => ({
    type: actionConstants.GET_SONGS_SUCCESS,
    payload: users
})

const getSongFail = (error) => ({
    type: actionConstants.GET_SONGS_FAIL,
    error
})

const gettingUploadSong = () => ({
    type: actionConstants.UPLOADING_SONG
})
const uploadSongSuccess = (song) => ({
    type: actionConstants.UPLOAD_SONG_SUCCESS,
    song
})
const uploadSongFail = (err) => ({
    type: actionConstants.UPLOAD_SONG_FAIL,
    err
})

const deleteSongSuccess = (song)=>{
    return {
        type: actionConstants.DELETE_SONG_SUCCESS,
        song
    }
}

export const closeModal = () => ({
    type: SONG_CLOSE_MODAL
})

export const getAllSongs = () => {
    return (dispatch) => {
        dispatch(gettingSongs);
        songApi.getAllSongsApi().then(data => {
            dispatch(getSongSuccess(data.data));
        }).catch(error => {
            if (error.response /*trường hợp server không sập thì có phản hồi*/) {
                dispatch(getSongFail(error.response.data));
            } else { /*trường hợp server sập*/
                dispatch(getSongFail("Unexpected error occured"));
            }
        })
    }
}

export const uploadSong = (data, image, song) => {
    return dispatch => {
        dispatch(gettingUploadSong())

        songApi.createSong(data).then(response => {
            let { songId } = response.data;
            songApi.uploadImageSong(songId, image).then(data => {
                songApi.uploadSongFile(songId, song).then(response => {
                    dispatch(uploadSongSuccess(response.data))
                })
            })
        }).catch(err => {
            dispatch(uploadSongFail(err))
        });

    }
}

export const deleteSong = (id)=>{
    return async dispatch=>{
        try{
            let data = await songApi.deleteSongApi(id);
            dispatch(deleteSongSuccess(data.data));
        }catch(err){
            
        }
    }
}