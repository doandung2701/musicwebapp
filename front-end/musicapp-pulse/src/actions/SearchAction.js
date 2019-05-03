import { SEARCHING_SONGS_AND_SINGERS, SEARCH_SONGS_AND_SINGERS_SUCCESS, SEARCH_SONGS_AND_SINGERS_FAIL } from "../constants/constants";
import { getSingersByNameApi } from "../Api/SingerApi";
import { getSongsByNameApi } from "../Api/SongApi";

const searchingSongsAndSingers = ()=>({
    type: SEARCHING_SONGS_AND_SINGERS
})

const searchSongsAndSingersSuccess = (data)=>({
    type: SEARCH_SONGS_AND_SINGERS_SUCCESS,
    data
})

const searchSongsAndSingersFail = ()=>({
    type: SEARCH_SONGS_AND_SINGERS_FAIL
})

export const searchSongsAndSingers = (name)=>{
    return async dispatch=>{
        dispatch(searchingSongsAndSingers());
        try{
            let data = await Promise.all([getSongsByNameApi(name), getSingersByNameApi(name)]);
            dispatch(searchSongsAndSingersSuccess(data));
        }catch(err){
            dispatch(searchSongsAndSingersFail());
        }
    }
}