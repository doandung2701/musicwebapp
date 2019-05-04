import Axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const axios = Axios.create({
    baseURL: API_BASE_URL + "/singers/",
    timeout: 5000
})

export const getSingersByNameApi = (name) => axios.get('find-by-name', {
    params: {
        name
    }
})
export const getAllSinger=()=>{
    return axios.get("find/find-all");
}