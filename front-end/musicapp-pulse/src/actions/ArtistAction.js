import { GETTING_ALL_SINGERS_PAGING, GET_ALL_SINGERS_PAGING_SUCCESS, GET_ALL_SINGERS_PAGING_FAIL, WIPE_FETCH_ON_SCROLL_SINGERS, GETTING_SINGER_BY_ID, GET_SINGER_BY_ID_SUCCESS, GET_SINGER_BY_ID_FAIL, GETTING_TOP_POPULAR_BY_SINGER, GET_TOP_POPULAR_BY_SINGER_SUCCESS, GET_TOP_POPULAR_BY_SINGER_FAIL } from "../constants/constants";
import { getSingersPagingApi, getSingerByIdApi } from "../Api/ArtistApi";
import { getTopPopularBySingerIdApi } from "../Api/SongApi";

const gettingAllSingersPaging = () => ({
    type: GETTING_ALL_SINGERS_PAGING
})
const getAllSingersPagingSuccess = (singers) => ({
    type: GET_ALL_SINGERS_PAGING_SUCCESS,
    singers
})

const getAllSingersPagingFail = () => ({
    type: GET_ALL_SINGERS_PAGING_FAIL
})

const gettingSingerById = ()=>({
    type: GETTING_SINGER_BY_ID
})

const getSingerByIdSuccess = (singer)=>({
    type: GET_SINGER_BY_ID_SUCCESS,
    singer
})

const getSingerByIdFail = ()=>({
    type: GET_SINGER_BY_ID_FAIL
})

const gettingTopPopularBySinger = ()=>({
    type: GETTING_TOP_POPULAR_BY_SINGER
})

const getTopPopularBySingerSuccess = (songs)=>({
    type: GET_TOP_POPULAR_BY_SINGER_SUCCESS,
    songs
})

const getTopPopularBySingerFail = ()=>({
    type: GET_TOP_POPULAR_BY_SINGER_FAIL
})

export const getTopPopularBySinger = (id)=>{
    return async dispatch =>{
        dispatch(gettingTopPopularBySinger());
        try{
            let data = await getTopPopularBySingerIdApi(id);
            dispatch(getTopPopularBySingerSuccess(data.data));
        }catch(err){
            dispatch(getTopPopularBySingerFail())
        }
    }
}

export const getSingerById = (id)=>{
    return async dispatch=>{
        dispatch(gettingSingerById());
        try{
            let data = await getSingerByIdApi(id);
            dispatch(getSingerByIdSuccess(data.data));
        }catch(err){
            dispatch(getSingerByIdFail())
        }
    }
}

export const getAllSingersPaging = (page) => {
    return async dispatch => {
        dispatch(gettingAllSingersPaging());
        setTimeout(async () => {
            try {
                let data = await getSingersPagingApi(page);
                dispatch(getAllSingersPagingSuccess(data.data));
            } catch (err) {
                dispatch(getAllSingersPagingFail())
            }
        })
    }
}

export const wipeFetchOnScrollSingers = ()=>({
    type: WIPE_FETCH_ON_SCROLL_SINGERS
})