import Axios from "axios";
import { API_BASE_URL } from "../constants";

 var axios = Axios.create({
     baseURL: API_BASE_URL+"albums/",
     timeout: 10000
 })

 export const getAlAlbumsApi = ()=>{
     return axios.get("find-all");
 }

 export const getAlbumByIdApi = (id)=>{
     return axios.get(`find-by-id/${id}`);
 }

 export const createAlbumApi=(album)=>{
     return axios.post("save-albums",album);
 }

 export const updateAlbumApi =(album)=>{
     return axios.put(`save-albums`,album);
 }

 export const deleteAlbumApi = (id)=>{
     return axios.delete(`delete-album?id=${id}`);
 }
 export const addOneSongToAlbum=(albumId,songId)=>{
     return axios.put(`${albumId}/${songId}`)
 }
export const updateThumbnailApi=(id,data)=>{
    return axios.put(`${id}/update-thumbnail`,data)
}
