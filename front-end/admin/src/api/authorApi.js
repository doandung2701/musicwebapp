import Axios from "axios";
import { API_BASE_URL } from "../constants";

var axios = Axios.create({
    baseURL: API_BASE_URL+"authors/",
    timeout: 10000
})

export const getAllAuthorsApi = () => {
    return axios.get("find-all",{
        headers: {
           'Content-Security-Policy': 'default-src https:'
        }
    });
}