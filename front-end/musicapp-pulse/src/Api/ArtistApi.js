import Axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const axios = Axios.create({
    baseURL: API_BASE_URL+"/singers/",
    timeout: 5000
})

export const getSingersPagingApi = (page)=>{
    return axios.get('find-paging',{
        params: {
            page,
            rows: 36
        }
    })
}

export const getSingerByIdApi = (id)=>{
    return axios.get(`find/by-id/${id}`)
}
