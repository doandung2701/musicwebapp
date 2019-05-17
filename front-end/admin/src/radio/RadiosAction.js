import * as actionConstants from "../constants/index";
import * as radioApi from "../api/radioApi";
import { RADIO_SHOW_MODAL, RADIO_CLOSE_MODAL } from "./RadioConstants";

export const openModal = (data = {
    songId: 0,
    songName: '',
    thumbnail: null,
    songSrc: null,
})=> ({
    type: RADIO_SHOW_MODAL,
    payload: data
})

export const closeModal = () => ({
    type: RADIO_CLOSE_MODAL
})

const gettingRadios = () => ({
    type: actionConstants.GETTING_RADIOS
})

const getRadiosSuccess = (radios) => ({
    type: actionConstants.GET_RADIOS_SUCCESS,
    payload: radios
})

const getRadiosFail = (error) => ({
    type: actionConstants.GET_RADIOS_FAIL,
    error
})

const deletingRadio = () => ({
    type: actionConstants.DELETING_RADIO
})

const deleteRadioSuccess = (radioId) => ({
    type: actionConstants.DELETE_RADIO_SUCCESS,
    payload: radioId
})

const deleteRadioFail = (error) => ({
    type: actionConstants.DELETE_RADIO_FAIL,
    error
})

const creatingRadio = () => ({
    type: actionConstants.CREATING_RADIO
})

const createRadioSuccess = (radio) => ({
    type: actionConstants.CREATE_RADIO_SUCCESS,
    payload: radio
})

const createRadioFail = (error) => ({
    type: actionConstants.CREATE_RADIO_FAIL,
    error
})

const updatingRadio = () => ({
    type: actionConstants.UPDATING_RADIO
})

const updateRadioSuccess = (radio) => ({
    type: actionConstants.UPDATE_RADIO_SUCCESS,
    payload: radio
})

const updateRadioFail = (error) => ({
    type: actionConstants.UPDATE_RADIO_FAIL,
    error
})


export const createRadio = (song) => {
    return dispatch => {
        dispatch(creatingRadio());
        radioApi.upFileRadioApi(song.thumbnail).then((rs) => {
            console.log(rs.data);
            song.thumbnail = rs.data;
            radioApi.upFileRadioApi(song.songSrc).then((rs1) => {
                console.log(rs1.data);
                song.songSrc = rs1.data;
                radioApi.createRadioApi(song).then(data=> {
                    song = {
                        ...song,
                        songId: data.data.songId
                    }
                    dispatch(createRadioSuccess(song));
                }).catch(error => {
                    if (error.response){
                        dispatch(createRadioFail(error.response.data));
                    }else{
                        dispatch(createRadioFail("Unexpected error occured"));
                    }
                })
            })
        }).catch((err)=> {
            if (err.response){
                dispatch(createRadioFail(err.response.data));
            }else{
                dispatch(createRadioFail("Unexpected error occured"));
            }
        })
    }
}

export const updateRadio = (song) => {
    return dispatch => {
        dispatch(updatingRadio());
        if (typeof(song.thumbnail) === "string" && typeof(song.songSrc) == "string") {
            console.log("none");
            radioApi.updateRadioApi(song).then(data => {
            dispatch(updateRadioSuccess(song));
            }).catch((error) => {
                dispatch(updateRadioFail(error))
            })
        } else if (typeof(song.thumbnail) === "object" && typeof(song.songSrc) == "object") {
            console.log("all");
            radioApi.upFileRadioApi(song.thumbnail).then((data) => {
                song.thumbnail = data.data;
                radioApi.upFileRadioApi(song.songSrc).then((data1) => {
                    song.songSrc = data1.data;
                    radioApi.updateRadioApi(song).then(data => {
                    dispatch(updateRadioSuccess(song));
                    }).catch((error) => {
                        dispatch(updateRadioFail(error))
                    })
                }).catch((error) => {
                    dispatch(updateRadioFail(error))
                })
            }).catch((error) => {
                dispatch(updateRadioFail(error))
            })
        } else if (typeof(song.thumbnail) === "object") {
            console.log("thumbnail");
            radioApi.upFileRadioApi(song.thumbnail).then(data => {
                song.thumbnail = data.data;
                radioApi.updateRadioApi(song).then(data => {
                    dispatch(updateRadioSuccess(song));
                }).catch((error) => {
                    dispatch(updateRadioFail(error))
                })
            }).catch((error) => {
                dispatch(updateRadioFail(error))
            })
        } else{
            console.log("song");
            radioApi.upFileRadioApi(song.songSrc).then(data => {
                song.songSrc = data.data;
                radioApi.updateRadioApi(song).then(data => {
                    dispatch(updateRadioSuccess(song));
                }).catch((error) => {
                    dispatch(updateRadioFail(error))
                })
            }).catch((error) => {
                dispatch(updateRadioFail(error))
            })
        }
    }
}

export const getAllRadios = () => {
    return (dispatch) => {
        dispatch(gettingRadios);
        radioApi.getAllRadiosApi().then(data => {
            dispatch(getRadiosSuccess(data.data));
        }).catch(error => {
            if (error.response /*trường hợp server không sập thì có phản hồi*/) {
                dispatch(getRadiosFail(error.response.data));
            } else { /*trường hợp server sập*/
                dispatch(getRadiosFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteRadio = (radioId) => {
    return dispatch => {
        dispatch(deletingRadio());
        radioApi.deleteRadioApi(radioId).then((data) => {
            dispatch(deleteRadioSuccess(radioId));
        }).catch(error => {
            if (error.response){
                dispatch(deleteRadioFail(error.response.data));
            }else{
                dispatch(deleteRadioFail("Unexpected error occured"));
            }
        })
    }
}
