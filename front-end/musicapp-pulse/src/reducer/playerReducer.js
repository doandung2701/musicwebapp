import { CHANGE_PLAYER_STATUS, CHANGE_AUDIO_SRC, PLAYER_PAUSE } from "../constants/constants";

let initialState = {
    playerStatus: PLAYER_PAUSE,
    src: '',
    id: '',
    name: '',
    artist: '',
    thumbnail: '/images/a1.jpg',

}

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PLAYER_STATUS:
            return {
                ...state,
                playerStatus: action.status
            }
        case CHANGE_AUDIO_SRC: 
            return {
                ...state,
                ...action.src
            }
        default: return state;
    }
}