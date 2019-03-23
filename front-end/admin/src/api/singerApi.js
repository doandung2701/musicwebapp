import Axios from "axios";
import { API_BASE_URL } from "../constants";

 var axios = Axios.create({
     baseURL: API_BASE_URL+"singers/",
     timeout: 10000
 })

 export const getAllSingersApi = ()=>{
     return axios.get("find/find-all",{
         headers: {
            'Content-Security-Policy': 'default-src https:'
         }
     });
 }

 export const getSingerByIdApi = (id)=>{
     return axios.get(`find/by-id/${id}`);
 }

 export const createSingerApi = (singer)=>{
     return axios.post("save/create-singer",singer);
 }

 export const updateSingerApi = (singerId,singerDetail)=>{
     return axios.put(`save/update-singer/${singerId}`,singerDetail);
 }

 export const deleteSingerApi = (id)=>{
     return axios.delete(`delete/${id}`);
 }

 export const findAllSongsBySingerIdApi = (id)=>{
     return axios.get(`find/songs-by-id/${id}`);
 }
 export const getSongsOfSinger=(id)=>{
     return axios.get(`find/songs-by-id/${id}`);
 }