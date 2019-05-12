import Axios from "axios";
import { API_BASE_URL } from "../constants";

var axios = Axios.create({
    baseURL: API_BASE_URL+"songs/",
    timeout: 10000
})

export const getAllSongsApi = () => {
    return axios.get("find-all",{
        headers: {
           'Content-Security-Policy': 'default-src https:'
        }
    });
}

export const createSong = (data) => {
    return axios.post("users/upload-song", data);
}
export const uploadImageSong = (id, data) => {
    return axios.put(`${id}/upload-image-song`, data);
}
export const uploadSongFile = (id, data) => {
    return axios.put(`${id}/upload-song`, data);
}

export const deleteSongApi = (id)=>{
    console.log("id",id)
    return axios.delete("delete-song",{
        params: {
            id 
        }
    })
}