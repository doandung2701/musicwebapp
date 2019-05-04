import {
    CHANGE_PLAYER_STATUS,
    CHANGE_AUDIO_SRC,
    PLAYER_PAUSE,
    ADD_SONG_TO_QUEUE,
    TOGGLE_REPEAT,
    REMOVE_ITEM_FROM_QUEUE
} from "../constants/constants";
import { findSongIndexInQueue } from "../helpers/helper";

let initialState = {
    playerStatus: PLAYER_PAUSE,
    nowPlaying: {
        songSrc: 'http://streaming.radionomy.com/JamendoLounge',
        songId: '',
        songName: '',
        singers: [],
        thumbnail: '/images/a1.jpg',
    },
    queue: [],
    repeat: false
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
                nowPlaying: { ...action.src }
            }
        case ADD_SONG_TO_QUEUE:
            if (findSongIndexInQueue(action.src, state.queue) < 0)
                return {
                    ...state,
                    queue: [...state.queue, action.src]
                };
            else
                return state;
        case TOGGLE_REPEAT:
            return {
                ...state,
                repeat: !state.repeat
            }
        case REMOVE_ITEM_FROM_QUEUE:
            let nowPlaying = {...state.nowPlaying};
            if (nowPlaying.songSrc===action.songSrc){
                // nowPlaying = initialState.nowPlaying
                return state;
            }
            let queue = state.queue.filter(value => {
                return value.songSrc !== action.songSrc
            })
            return {
                ...state,
                queue,
                // nowPlaying
            }
        default: return state;
    }
}