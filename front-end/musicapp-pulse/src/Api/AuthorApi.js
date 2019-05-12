import Axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const axios = Axios.create({
    baseURL: API_BASE_URL+"/authors/",
    timeout: 5000
})

export const getAllAuthorsApi = ()=>{
    return axios.get("find-all");
}

export const getAuthorsPagingApi = (page)=>{
    return axios.get('find-paging',{
        params: {
            page,
            rows: 36
        }
    })
}
