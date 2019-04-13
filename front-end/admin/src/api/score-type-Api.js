import Axios from "axios";
import { API_BASE_URL } from "../constants";
var axios = Axios.create({
    baseURL: API_BASE_URL+"score-types/",
    timeout: 10000
})
export const getAllScoreTypeApi=()=>{
    return axios.get("find-all");
}
export const getScoreTypeByIdApi=(id)=>{
    return axios.get(`find-by-id/${id}`);
}
export const createScoreTypeApi=(data)=>{
    return axios.post("save-score-types",data)
}
export const updateScoreTypeApi=(id,data)=>{
    return axios.put(`save-score-types/${id}`,data);
}
export const deleteScoreTypeApi=(id)=>{
    return axios.delete(`delete-score-types/${id}`);
}
export const findAllScoreTypeWithPagingApi=(page,row,orderBy,direction)=>{
    return axios.get(`find-all-with-paging?page=${page}&row=${row}&orderBy=${orderBy}&direction=${direction}`)
}
