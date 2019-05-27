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

const updatingSong = () => ({
    type: actionConstants.UPDATING_SONG
})

const updateSongSuccess = (song) => ({
    type: actionConstants.UPDATE_SONG_SUCCESS,
    payload: song
})

const updateSongFail = (error) => ({
    type: actionConstants.UPDATE_SONG_FAIL,
    error
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
                    songApi.getSongById(response.data.songId).then(data => {
                        dispatch(uploadSongSuccess(data.data))
                    })
                })
            })
        }).catch(err => {
            dispatch(uploadSongFail(err))
        });

    }
}

export const updateSong = (song, songId) => {
    return dispatch => {
        dispatch(updatingSong())
        if (typeof(song.thumbnail) === "string" && typeof(song.songSrc) == "string") {
            songApi.updateSong(song, songId).then(data => {
                var newSong = {
                    songId,
                    ...song
                };
            dispatch(updateSongSuccess(newSong));
            }).catch((error) => {
                dispatch(updateSongFail(error))
            })
        } else if (typeof(song.thumbnail) === "object" && typeof(song.songSrc) == "object") {
            songApi.uploadImageSong(songId,song.thumbnail).then((data) => {
                song.thumbnail = data.data.thumbnail;
                songApi.uploadSongFile(songId,song.songSrc).then((data1) => {
                    song.songSrc = data1.data.songSrc;
                    songApi.updateSong(song, songId).then(data => {
                        var newSong = {
                            songId,
                            ...song
                        };
                        console.log(newSong);
                    dispatch(updateSongSuccess(newSong));
                    }).catch((error) => {
                        dispatch(updateSongFail(error))
                    })
                }).catch((error) => {
                    dispatch(updateSongFail(error))
                })
            }).catch((error) => {
                dispatch(updateSongFail(error))
            })
        } else if (typeof(song.thumbnail) === "object") {
            songApi.uploadImageSong(songId, song.thumbnail).then(data => {
                song.thumbnail = data.data.thumbnail;
                songApi.updateSong(song, songId).then(data => {
                    var newSong = {
                        songId,
                        ...song
                    };
                    console.log(newSong);
                dispatch(updateSongSuccess(newSong));
                }).catch((error) => {
                    dispatch(updateSongFail(error))
                })
            }).catch((error) => {
                dispatch(updateSongFail(error))
            })
        } else{
            console.log(typeof(song.thumbnail));
            songApi.uploadSongFile(songId, song.songSrc).then(data => {
                song.songSrc = data.data.songSrc;
                songApi.updateSong(song, songId).then(data => {
                    var newSong = {
                        songId,
                        ...song
                    };
                    console.log(newSong);
                dispatch(updateSongSuccess(newSong));
                }).catch((error) => {
                    dispatch(updateSongFail(error))
                })
            }).catch((error) => {
                dispatch(updateSongFail(error))
            })
        }
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