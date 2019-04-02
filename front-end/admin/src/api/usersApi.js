import Axios from "axios";
import {
    API_BASE_URL
} from "../constants";

var axios = Axios.create({
    baseURL: API_BASE_URL + "users/",
    timeout: 10000
})

export const getAllUsersApi = () => {
    return axios.get("fill-all", {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const getUserbyIdApi = (id) => {
    return axios.get(`/find-by-id/${id}`, {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const toggleActiveUserApi = (id, active) => {
    return axios.put(`toggle-active/${id}`, active);
}

export const getPlayListOfUserApi = (id) => {
    return axios.get(`get-playlist-users/${id}/playlists`, {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}