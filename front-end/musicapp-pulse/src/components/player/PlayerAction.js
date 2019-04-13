import { CHANGE_PLAYER_STATUS, CHANGE_AUDIO_SRC } from "../../constants/constants";

export const changePlayerStatus = (status)=>({
    type: CHANGE_PLAYER_STATUS,
    status
})

export const changeAudioSrc = (src)=>({
    type: CHANGE_AUDIO_SRC,
    src
})