import {
    GETTING_ALL_SONG_PAGING, GET_ALL_SONG_PAGING_SUCCESS,
    GET_ALL_SONG_PAGING_FAIL, GETTING_TOP_5_LIKE, GET_TOP_5_LIKE_SUCCESS,
    GET_TOP_5_LIKE_FAIL, GETTING_TRENDING_SONGS, GET_TRENDING_SONGS_SUCCCESS,
    GET_TRENDING_SONGS_FAIL, WIPE_FETCH_ON_SCROLL_SONGS,
    GETTING_DISCOVER_HEADER_DATA, GET_DISCOVER_HEADER_DATA_SUCCESS,
    GET_DISCOVER_HEADER_DATA_FAIL, GETTING_8_NEWEST, GET_8_NEWEST_SUCCESS,
    GET_8_NEWEST_FAIL, GETTING_SONG_BY_SINGER_PAGING, GET_SONG_BY_SINGER_PAGING_SUCCESS,
    GET_SONG_BY_SINGER_PAGING_FAIL, GETTING_SONG_BY_ID, GET_SONG_BY_ID_SUCCESS,
    GET_SONG_BY_ID_FAIL, GETTING_SONG_BY_USER_ID, GET_SONG_BY_USER_ID_SUCCESS,
    GET_SONG_BY_USER_ID_FAIL, LIKE_SONG_SUCCESS, LIKING_SONG, UPLOAD_SONG_FAIL, 
    UPLOADING_SONG, UPLOAD_SONG_SUCCESS, GET_SONGS_BY_ALBUMS_ID_FAIL,
     GET_SONGS_BY_ALBUMS_ID_SUCCESS, GETTING_SONGS_BY_ALBUMS_ID, GETTING_RECOMMENDED_SONGS, GET_RECOMMENDED_SONGS_SUCCESS, GET_RECOMMENDED_SONGS_FAIL, GETTING_SONGS_BY_PLAYLIST_ID, GET_SONGS_BY_PLAYLIST_ID_SUCCESS, GET_SONGS_BY_PLAYLIST_ID_FAIL, GETTING_LIKE_SONG_BY_USER_ID, GET_LIKE_SONG_BY_USER_ID_SUCCESS, GET_LIKE_SONG_BY_USER_ID_FAIL, WIPE_FETCH_ON_SCROLL_LIKE_SONGS,
} from "../constants/constants";
import { getAllSongWithPagingApi, getTop5LikeApi, getTrendingSongsApi, getRandom4JazzApi, getRandom4PopApi, get8NewApi, getSongsBySingerPagingApi, getSongByIdApi, getSongByUserIdApi, createSong, uploadImageSong, uploadSongFile, getSongsByAlbumsIdApi, getRecommendedSongsApi, getSongsByPlayListIdApi, getLikeSongByUserIdApi } from "../Api/SongApi";
import { likeSongApi } from "../Api/UserApi";
import { message } from "antd";
import { toTop } from "../helpers/helper";

const gettingAllSongPaging = () => ({
    type: GETTING_ALL_SONG_PAGING
})

const getAllSongPagingSuccess = (songs) => ({
    type: GET_ALL_SONG_PAGING_SUCCESS,
    songs
})

const getAllSongPagingFail = () => ({
    type: GET_ALL_SONG_PAGING_FAIL
})

const gettingSongBySingerPaging = () => ({
    type: GETTING_SONG_BY_SINGER_PAGING
})

const getSongBySingerPagingSuccess = (songs) => ({
    type: GET_SONG_BY_SINGER_PAGING_SUCCESS,
    songs
})

const getSongBySingerPagingFail = () => ({
    type: GET_SONG_BY_SINGER_PAGING_FAIL
})


const gettingTop5Like = () => ({
    type: GETTING_TOP_5_LIKE
})

const getTop5LikeSuccess = (songs) => ({
    type: GET_TOP_5_LIKE_SUCCESS,
    songs
})

const getTop5LikeFail = () => ({
    type: GET_TOP_5_LIKE_FAIL
})

const gettingTredingSongs = () => ({
    type: GETTING_TRENDING_SONGS
})

const getTrendingSongsSuccess = (songs) => ({
    type: GET_TRENDING_SONGS_SUCCCESS,
    songs
})

const getTrendingSongsFail = () => ({
    type: GET_TRENDING_SONGS_FAIL
})

const gettingDiscoverHeaderData = () => ({
    type: GETTING_DISCOVER_HEADER_DATA
})

const getDiscoverHeaderDataSuccess = (songs) => ({
    type: GET_DISCOVER_HEADER_DATA_SUCCESS,
    songs
})

const getDiscoverHeaderDataFail = () => ({
    type: GET_DISCOVER_HEADER_DATA_FAIL
})

const getting8NewestSongs = () => ({
    type: GETTING_8_NEWEST
})

const get8NewstSongsSuccess = (songs) => ({
    type: GET_8_NEWEST_SUCCESS,
    songs
})

const get8NewstSongsFail = () => ({
    type: GET_8_NEWEST_FAIL
})

export const gettingSongById = () => ({
    type: GETTING_SONG_BY_ID
})

export const getSongByIdSuccess = (song) => ({
    type: GET_SONG_BY_ID_SUCCESS,
    song
})

export const getSongByIdFail = () => ({
    type: GET_SONG_BY_ID_FAIL
})

const gettingSongByUserId = () => ({
    type: GETTING_SONG_BY_USER_ID
})
const gettingLikeSongByUserId=()=>({
    type:GETTING_LIKE_SONG_BY_USER_ID
})
const getSongByUserIdSuccess = (songs) => ({
    type: GET_SONG_BY_USER_ID_SUCCESS,
    songs
})

const getLikeSongByUserIdSuccess=(songs)=>({
    type:GET_LIKE_SONG_BY_USER_ID_SUCCESS,
    songs
})


const getSongByUserIdFail = () => ({
    type: GET_SONG_BY_USER_ID_FAIL
})

const getLikeSongByUserIdFail=()=>({
    type:GET_LIKE_SONG_BY_USER_ID_FAIL
})

const likingSong = () => ({
    type: LIKING_SONG
})

const likeSongSuccess = (songId, userId) => ({
    type: LIKE_SONG_SUCCESS,
    songId,
    userId
})

const gettingSongsByAlbumId = () => ({
    type: GETTING_SONGS_BY_ALBUMS_ID
})

const getSongsByAlbumIdSuccess = (songs) => ({
    type: GET_SONGS_BY_ALBUMS_ID_SUCCESS,
    songs
})

const getSongsByAlbumIdFail = () => ({
    type: GET_SONGS_BY_ALBUMS_ID_FAIL
})

const gettingSongsByPlayListId = () => ({
    type: GETTING_SONGS_BY_PLAYLIST_ID
})

const getSongsByPlayListIdSuccess = (songs) => ({
    type: GET_SONGS_BY_PLAYLIST_ID_SUCCESS,
    songs
})

const getSongsByPlayListIdFail = () => ({
    type: GET_SONGS_BY_PLAYLIST_ID_FAIL
})

const gettingRecommendedSongs = ()=>({
    type: GETTING_RECOMMENDED_SONGS
})

const getRecommendedSongsSuccess = (songs)=>({
    type: GET_RECOMMENDED_SONGS_SUCCESS,
    songs
})

const getRecommendedSongsFail = ()=>({
    type: GET_RECOMMENDED_SONGS_FAIL
})

export const getRecommendedSongs = (ids)=>{
    return async dispatch=>{
        dispatch(gettingRecommendedSongs());
        try{
            let data = await getRecommendedSongsApi(ids);
            dispatch(getRecommendedSongsSuccess(data.data));
            console.log("data",data.data)
        }catch(err){
            dispatch(getRecommendedSongsFail());
        }
    }
}

export const getSongByAlbumId = (page, id) => {
    return async dispatch => {
        dispatch(gettingSongsByAlbumId());
        try {
            let data = await getSongsByAlbumsIdApi(page, id);
            dispatch(getSongsByAlbumIdSuccess(data.data));
        } catch (err) {
            dispatch(getSongsByAlbumIdFail());
        }
    }
}

export const getSongByPlayListId = (page, id) => {
    return async dispatch => {
        dispatch(gettingSongsByPlayListId());
        try {
            let data = await getSongsByPlayListIdApi(page, id);
            dispatch(getSongsByPlayListIdSuccess(data.data));
        } catch (err) {
            dispatch(getSongsByPlayListIdFail());
        }
    }
}



export const likeSong = (userId, songId) => {
    return async dispatch => {
        dispatch(likingSong());
        try {
            await likeSongApi(songId, userId);
            dispatch(likeSongSuccess(songId, userId));
        } catch (err) {
            message.error(err.toString(), 3);
        }
    }
}

export const getSongByUserId = (page, id) => {
    return async dispatch => {
        dispatch(gettingSongByUserId());
        try {
            let data = await getSongByUserIdApi(page, id);
            dispatch(getSongByUserIdSuccess(data.data));
        } catch (err) {
            dispatch(getSongByUserIdFail());
        }
    }
}
export const getLikeSongByUserId=(page,id)=>{
    return async dispatch=>{
        dispatch(gettingLikeSongByUserId())
        try {
            let data=await getLikeSongByUserIdApi(page,id);
            console.log(data.data);
            dispatch(getLikeSongByUserIdSuccess(data.data))
        } catch (error) {
            dispatch(getLikeSongByUserIdFail())
        }
    }
}

export const getSongById = (id) => {
    return async dispatch => {
        dispatch(gettingSongById());
        try {
            let data = await getSongByIdApi(id);
            dispatch(getSongByIdSuccess(data.data));
        } catch (err) {
            dispatch(getSongByIdFail());
        }
    }
}

export const get8NewestSongs = () => {
    return async dispatch => {
        dispatch(getting8NewestSongs());
        try {
            let data = await get8NewApi();
            dispatch(get8NewstSongsSuccess(data.data));
        } catch (err) {
            dispatch(get8NewstSongsFail())
        }
    }
}

export const getAllSongPaging = (page) => {
    return async dispatch => {
        dispatch(gettingAllSongPaging());
        try {
            setTimeout(async () => {
                let data = await getAllSongWithPagingApi(page);
                dispatch(getAllSongPagingSuccess(data.data));
            }, 1000)
            // console.log(data.data);
        } catch (err) {
            dispatch(getAllSongPagingFail());
        }
    }
}

export const getSongBySingerPaging = (page, singerId) => {
    return async dispatch => {
        dispatch(gettingSongBySingerPaging());
        try {
            setTimeout(async () => {
                let data = await getSongsBySingerPagingApi(page, singerId);
                dispatch(getSongBySingerPagingSuccess(data.data));
                let scroll = sessionStorage.getItem("currentScroll");
                if (scroll) {
                    toTop(scroll);
                    sessionStorage.removeItem("currentScroll");
                }
            }, 1000)
            // console.log(data.data);
        } catch (err) {
            dispatch(getSongBySingerPagingFail());
        }
    }
}

export const getTop5Like = () => {
    return async dispatch => {
        dispatch(gettingTop5Like());
        try {
            let data = await getTop5LikeApi();
            dispatch(getTop5LikeSuccess(data.data))
        } catch (err) {
            dispatch(getTop5LikeFail());
        }
    }
}

export const getTrendingSongs = () => {
    return async dispatch => {
        dispatch(gettingTredingSongs());
        try {
            let data = await getTrendingSongsApi();
            dispatch(getTrendingSongsSuccess(data.data))
        } catch (err) {
            dispatch(getTrendingSongsFail());
        }
    }
}

export const wipeFetchOnScrollSongs = () => ({
    type: WIPE_FETCH_ON_SCROLL_SONGS
})
export const wipeFetchOnScrollLikeSongs=()=>({
    type:WIPE_FETCH_ON_SCROLL_LIKE_SONGS
})

export const getDiscoverHeaderData = () => {
    return async dispatch => {
        dispatch(gettingDiscoverHeaderData());
        try {
            let data = await Promise.all([getRandom4JazzApi(), getRandom4PopApi()]);
            dispatch(getDiscoverHeaderDataSuccess(data))
        } catch (err) {
            dispatch(getDiscoverHeaderDataFail())
        }
    }
}
const gettingUploadSong = () => ({
    type: UPLOADING_SONG
})
const uploadSongSuccess = (song) => ({
    type: UPLOAD_SONG_SUCCESS,
    song
})
const uploadSongFail = (err) => ({
    type: UPLOAD_SONG_FAIL,
    err
})
export const uploadSong = (data, image, song) => {
    return dispatch => {
        dispatch(gettingUploadSong())

        createSong(data).then(response => {
            let { songId } = response.data;
            uploadImageSong(songId, image).then(data => {
                uploadSongFile(songId, song).then(response => {
                    console.log(response.data);

                    dispatch(uploadSongSuccess(response.data))
                })
            })
        }).catch(err => {
            dispatch(uploadSongFail(err))
        });

    }
}