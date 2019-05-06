import Axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants/constants";

const axios = Axios.create({
    baseURL: API_BASE_URL+"/albums/",
    timeout: 5000,
    headers: {
        "Authorization": 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }
})

export const getAlbumsBySingerIdApi = (singerId)=>{
    return axios.get("find-by-singer-id",{
        params:{
            singerId
        }
    })
}

export const getAlbumsByIdApi = (id) =>{
    return axios.get(`find-by-id/${id}`);
}