import { GETTING_ALBUMS_BY_SINGER_ID, GET_ALBUMS_BY_SINGER_ID_SUCCESS, GET_ALBUMS_BY_SINGER_ID_FAIL, GETTING_ALBUMS_BY_ID, GET_ALBUMS_BY_ID_SUCCESS, GET_ALBUMS_BY_ID_FAIL } from "../constants/constants";
import { getAlbumsBySingerIdApi, getAlbumsByIdApi } from "../Api/AlbumApi";

const gettingAlbumsBySingerId = ()=>({
    type: GETTING_ALBUMS_BY_SINGER_ID
})

const getAlbumsBySingerIdSuccess = (albums)=>({
    type: GET_ALBUMS_BY_SINGER_ID_SUCCESS,
    albums
})

const getAlbumsBySingerIdFail = ()=>({
    type: GET_ALBUMS_BY_SINGER_ID_FAIL
})

const gettingAlbumsById = ()=>({
    type: GETTING_ALBUMS_BY_ID
})

const getAlbumsByIdSuccess = (album)=>({
    type: GET_ALBUMS_BY_ID_SUCCESS,
    album
})

const getAlbumsByIdFail = ()=>({
    type: GET_ALBUMS_BY_ID_FAIL
})

export const getAlbumsBySingerId = (singerId)=>{
    return async dispatch=>{
        dispatch(gettingAlbumsBySingerId());
        try{
            let data =await getAlbumsBySingerIdApi(singerId);
            dispatch(getAlbumsBySingerIdSuccess(data.data));
        }catch(err){
            dispatch(getAlbumsBySingerIdFail());
        }
    }
}

export const getAlbumsById = (id)=>{
    return async dispatch=>{
        dispatch(gettingAlbumsById());
        try{
            let data =await getAlbumsByIdApi(id);
            dispatch(getAlbumsByIdSuccess(data.data));
        }catch(err){
            dispatch(getAlbumsByIdFail());
        }
    }
}