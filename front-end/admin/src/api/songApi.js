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
