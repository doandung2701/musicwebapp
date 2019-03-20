import { GETTING_SONGS_BY_SINGER_ID, GET_SONGS_BY_SINGER_ID_SUCCESS, GET_SONGS_BY_SINGER_ID_FAIL } from "../constants";
import { findAllSongsBySingerIdApi } from "../api/singerApi";

const gettingSongsBySingerId = ()=>({
    type: GETTING_SONGS_BY_SINGER_ID
})

const getSongsBySingerIdSuccess = (songs)=>({
    type: GET_SONGS_BY_SINGER_ID_SUCCESS,
    songs
})

const getSongsBySingerIdFail = (error)=>({
    type: GET_SONGS_BY_SINGER_ID_FAIL,
    error
})

export const getSongsBySingerId = (id)=>{
    return dispatch=>{
        dispatch(gettingSongsBySingerId());
        findAllSongsBySingerIdApi(id).then(data=>{
            dispatch(getSongsBySingerIdSuccess(data.data))
        }).catch(error=>{
            error.reponse?dispatch(getSongsBySingerIdFail(error.reponse.data)):
            dispatch("Unexpected error occured");
        })
    }
}


