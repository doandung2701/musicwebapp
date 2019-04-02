import Axios from 'axios';
import {
    API_BASE_URL
} from "../constants"

var axios = Axios.create({
    baseURL: API_BASE_URL + "playlist/",
    timeout: 10000
})

export const getAllPlayListApi = () => {
    return axios.get("find-all", {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const findPlayListByUserIdApi = (id) => {
    return axios.get(`find-by-user-id/${id}`, {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const findPlayListByNameApi = (name) => {
    return axios.get(`find-by-name/${name}`, {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const findPlayListByIdApi = (id) => {
    return axios.get(`find-by-id/${id}`,{
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const createPlayListApi = (playlist) => {
    return axios.post("save-playlist",playlist)
}

export const updatePlayListApi = (playlist) => {
    return axios.put("save-playlist",playlist)
}

export const deletePlayListApi = (playlist) => {
    return axios.delete("delete-playlist",playlist);
}

