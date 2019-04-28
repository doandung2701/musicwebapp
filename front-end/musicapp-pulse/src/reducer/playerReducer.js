import { CHANGE_PLAYER_STATUS,
     CHANGE_AUDIO_SRC, 
     PLAYER_PAUSE } from "../constants/constants";

let initialState = {
    playerStatus: PLAYER_PAUSE,
<<<<<<< HEAD
    src: 'http://tracking.musixmatch.com/t1.0/mzoCLtOg7U2B2B6ROdSvu+HvAFuzkE0/cTF/',
=======
    src: 'https://cdns-preview-d.dzcdn.net/stream/c-d28ee67c24d60e740866c7709d772f55-10.mp3',
>>>>>>> e109b343ab23af1732eef576c758ee8199d98c7c
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