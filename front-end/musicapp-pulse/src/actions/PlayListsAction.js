import { GETTING_PLAYLISTS_BY_USER_ID, GET_PLAYLISTS_BY_USER_ID_SUCCESS, GET_PLAYLISTS_BY_USER_ID_FAIL, GETTING_PLAYLISTS_BY_ID, GET_PLAYLISTS_BY_ID_SUCCESS, GET_PLAYLISTS_BY_ID_FAIL } from "../constants/constants";
import { getPlaylistsByUserIdApi, getPlaylistsByIdApi } from "../Api/PlayListApi";

const gettingPlaylistsByUserId = ()=>({
    type: GETTING_PLAYLISTS_BY_USER_ID
})

const getPlaylistsByUserIdSuccess = (playLists)=>({
    type: GET_PLAYLISTS_BY_USER_ID_SUCCESS,
    playLists
})

const getPlaylistsByUserIdFail = ()=>({
    type: GET_PLAYLISTS_BY_USER_ID_FAIL
})

const gettingPlaylistsById = ()=>({
    type: GETTING_PLAYLISTS_BY_ID
})

const getPlaylistsByIdSuccess = (playList)=>({
    type: GET_PLAYLISTS_BY_ID_SUCCESS,
    playList
})

const getPlaylistsByIdFail = ()=>({
    type: GET_PLAYLISTS_BY_ID_FAIL
})

export const getPlaylistsByUserId = (userId)=>{
    return async dispatch=>{
        dispatch(gettingPlaylistsByUserId());
        try{
            let data =await getPlaylistsByUserIdApi(userId);
            dispatch(getPlaylistsByUserIdSuccess(data.data));
        }catch(err){
            dispatch(getPlaylistsByUserIdFail());
        }
    }
}

export const getPlaylistsById = (id)=>{
    return async dispatch=>{
        dispatch(gettingPlaylistsById());
        try{
            let data =await getPlaylistsByIdApi(id);
            dispatch(getPlaylistsByIdSuccess(data.data));
        }catch(err){
            dispatch(getPlaylistsByIdFail());
        }
    }
}