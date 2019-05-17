import Axios from "axios";
import { API_BASE_URL } from "../constants";

var axios = Axios.create({
    baseURL: API_BASE_URL+"radios/",
    timeout: 10000
})

export const getAllRadiosApi = () => {
    return axios.get("find-all",{
        headers: {
           'Content-Security-Policy': 'default-src https:'
        }
    });
}

export const deleteRadioApi = (songId) => {
    console.log(songId);
    return axios.delete(`/delete-radio-channel/${songId}`); //doc lại axios
}

export const createRadioApi = (song) => {
    return axios.post("create-radio-channel",song)
}

export const upFileRadioApi = (file) => {
    console.log(file);
    return axios.post("save-radio-file",file)
}

export const updateRadioApi = (song) => {
    return axios.put("update-radio-channel",song)
}
