import Axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants/constants";

const axios = Axios.create({
    baseURL: API_BASE_URL+"/playlist/",
    timeout: 5000,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    }
})

export const getPlaylistsByUserIdApi = (id)=>{
    return axios.get('find-by-user-id',{
        params:{
            id
        }
    })
}

export const getPlaylistsByIdApi = (id)=>{
    return axios.get(`find-by-id/${id}`);
}