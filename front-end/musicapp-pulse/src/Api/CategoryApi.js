import Axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const axios = Axios.create({
    baseURL: API_BASE_URL+"/categories/",
    timeout: 5000
})

export const getAllCategoriesApi = ()=>{
    return axios.get("find-all");
}