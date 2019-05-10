import {
    GETTING_ALL_SONG_PAGING, GET_ALL_SONG_PAGING_SUCCESS, GET_ALL_SONG_PAGING_FAIL,
    GETTING_TOP_5_LIKE, GET_TOP_5_LIKE_SUCCESS, GET_TOP_5_LIKE_FAIL, GETTING_TRENDING_SONGS,
    GET_TRENDING_SONGS_SUCCCESS, GET_TRENDING_SONGS_FAIL, WIPE_FETCH_ON_SCROLL_SONGS,
    GETTING_DISCOVER_HEADER_DATA, GET_DISCOVER_HEADER_DATA_SUCCESS, GET_DISCOVER_HEADER_DATA_FAIL,
    GETTING_8_NEWEST, GET_8_NEWEST_SUCCESS, GET_8_NEWEST_FAIL, GETTING_SONG_BY_SINGER_PAGING,
    GET_SONG_BY_SINGER_PAGING_SUCCESS, GET_SONG_BY_SINGER_PAGING_FAIL, GET_SONG_BY_ID_SUCCESS,
    GET_SONG_BY_ID_FAIL, GETTING_SONG_BY_ID, GETTING_SONG_BY_USER_ID, GET_SONG_BY_USER_ID_SUCCESS,
    GET_SONG_BY_USER_ID_FAIL, LIKE_SONG_SUCCESS, GETTING_SONGS_BY_ALBUMS_ID,
    GET_SONGS_BY_ALBUMS_ID_SUCCESS, GET_SONGS_BY_ALBUMS_ID_FAIL, UPLOAD_SONG_SUCCESS,
    GETTING_RECOMMENDED_SONGS, GET_RECOMMENDED_SONGS_SUCCESS, GET_RECOMMENDED_SONGS_FAIL,
    GETTING_SONGS_BY_PLAYLIST_ID, GET_SONGS_BY_PLAYLIST_ID_SUCCESS, GET_SONGS_BY_PLAYLIST_ID_FAIL, GET_LIKE_SONG_BY_USER_ID_SUCCESS, GETTING_LIKE_SONG_BY_USER_ID, GET_LIKE_SONG_BY_USER_ID_FAIL
} from "../constants/constants";

const initialState = {
    list: [],
    top5Like: [],
    trendingSongs: [],
    random4Jazz: [],
    random4Pop: [],
    newest8Songs: [],
    recommendedSongs: [],
    singleSong: {},
    isGettingRecommendedSongs: false,
    isGettingSongById: false,
    isGettingNewest8: false,
    isGettingDiscoverHeader: false,
    isGettingTrending: false,
    isGettingTop5: false,
    isGetting: false,
    error: false
}

export const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_ALL_SONG_PAGING:
        case GETTING_SONG_BY_SINGER_PAGING:
        case GETTING_SONG_BY_USER_ID:
        case GETTING_SONGS_BY_ALBUMS_ID:
        case GETTING_SONGS_BY_PLAYLIST_ID:
            return {
                ...state,
                isGetting: true,
                error: false
            }
        case GET_ALL_SONG_PAGING_SUCCESS:
        case GET_SONG_BY_SINGER_PAGING_SUCCESS:
        case GET_SONG_BY_USER_ID_SUCCESS:
        case GET_SONGS_BY_ALBUMS_ID_SUCCESS:
        case GET_SONGS_BY_PLAYLIST_ID_SUCCESS:
                return {
                    ...state,
                    isGetting: false,
                    list: [...state.list, ...action.songs],

                }
            
        case UPLOAD_SONG_SUCCESS:
            return {
                ...state,
                isGetting: false,
                list: [action.song, ...state.list],
            }
        case GET_ALL_SONG_PAGING_FAIL:
        case GET_SONG_BY_SINGER_PAGING_FAIL:
        case GET_SONG_BY_USER_ID_FAIL:
        case GET_SONGS_BY_ALBUMS_ID_FAIL:
        case GET_SONGS_BY_PLAYLIST_ID_FAIL:
            return {
                ...state,
                isGetting: false,
                error: true
            }
        case GETTING_RECOMMENDED_SONGS:
            return {
                ...state,
                isGettingRecommendedSongs: true
            }
        case GET_RECOMMENDED_SONGS_SUCCESS:
            return {
                ...state,
                isGettingRecommendedSongs: false,
                recommendedSongs: action.songs
            }
        case GET_RECOMMENDED_SONGS_FAIL:
            return {
                ...state,
                isGettingRecommendedSongs: false
            }
        case GETTING_TOP_5_LIKE:
            return {
                ...state,
                isGettingTop5: true,
                error: false
            }
        case GET_TOP_5_LIKE_SUCCESS:
            return {
                ...state,
                isGettingTop5: false,
                top5Like: action.songs
            }
        case GET_TOP_5_LIKE_FAIL:
            return {
                ...state,
                isGettingTop5: false,
                error: true
            }
        case GETTING_TRENDING_SONGS:
            return {
                ...state,
                isGettingTrending: true,
                error: false
            }
        case GET_TRENDING_SONGS_SUCCCESS:
            return {
                ...state,
                isGettingTrending: false,
                trendingSongs: action.songs
            }
        case GET_TRENDING_SONGS_FAIL:
            return {
                ...state,
                isGettingTrending: false,
                error: true
            }
        case WIPE_FETCH_ON_SCROLL_SONGS:
            return {
                ...state,
                list: []
            }
        case GETTING_DISCOVER_HEADER_DATA:
            return {
                ...state,
                isGettingDiscoverHeader: true
            }
        case GET_DISCOVER_HEADER_DATA_SUCCESS:
            return {
                ...state,
                random4Jazz: action.songs[0].data,
                random4Pop: action.songs[1].data,
                isGettingDiscoverHeader: false
            }
        case GET_DISCOVER_HEADER_DATA_FAIL:
            return {
                ...state,
                isGettingDiscoverHeader: false
            }
        case GETTING_8_NEWEST:
            return {
                ...state,
                isGettingNewest8: true
            }
        case GET_8_NEWEST_SUCCESS:
            return {
                ...state,
                isGettingNewest8: false,
                newest8Songs: action.songs
            }
        case GET_8_NEWEST_FAIL:
            return {
                ...state,
                isGettingNewest8: false
            }
        case GETTING_SONG_BY_ID:
            return {
                ...state,
                isGettingSongById: true
            }
        case GET_SONG_BY_ID_SUCCESS:
            return {
                ...state,
                singleSong: action.song,
                isGettingSongById: false
            }
        case GET_SONG_BY_ID_FAIL:
            return {
                ...state,
                isGettingSongById: false
            }
        case LIKE_SONG_SUCCESS:
            let { songId, userId } = action;
            let updateList = (value) => {
                if (value.songId === songId) {
                    value.likeUserIds.push(userId);
                    value.likeCount = value.likeUserIds.length
                }
            }
            let list = [...state.list];
            list.forEach(updateList);
            let top5Like = [...state.top5Like];
            top5Like.forEach(updateList);
            let trendingSongs = [...state.trendingSongs];
            trendingSongs.forEach(updateList);
            let random4Jazz = [...state.random4Jazz];
            random4Jazz.forEach(updateList);
            let random4Pop = [...state.random4Pop];
            random4Pop.forEach(updateList);
            let newest8Songs = [...state.newest8Songs];
            newest8Songs.forEach(updateList);
            let singleSong = { ...state.singleSong };
            if (singleSong && singleSong.songId === songId) {
                singleSong.likeUserIds.push(userId);
                singleSong.likeCount = singleSong.likeUserIds.length;
            };
            return {
                ...state,
                list,
                top5Like,
                trendingSongs,
                random4Jazz,
                random4Pop,
                newest8Songs,
                singleSong
            }

        default:
            return state;
    }
}