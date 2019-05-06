import { CHANGE_PLAYER_STATUS, CHANGE_AUDIO_SRC, ADD_SONG_TO_QUEUE, TOGGLE_REPEAT, REMOVE_ITEM_FROM_QUEUE, ADD_MULTI_SONG_TO_QUEUE } from "../../constants/constants";
import { message } from "antd";

export const changePlayerStatus = (status) => ({
    type: CHANGE_PLAYER_STATUS,
    status
})

export const changeAudioSrc = (src) => {
    return {
        type: CHANGE_AUDIO_SRC,
        src
    }
}

export const addSongToQueue = (src) => {
    return {
        type: ADD_SONG_TO_QUEUE,
        src
    }
}

export const addMutipleSongToQueue = (src) => {
    return {
        type: ADD_MULTI_SONG_TO_QUEUE,
        src
    }
}

export const toggleRepeat = () => ({
    type: TOGGLE_REPEAT
})

export const removeFromQueue = (songSrc) => ({
    type: REMOVE_ITEM_FROM_QUEUE,
    songSrc
})