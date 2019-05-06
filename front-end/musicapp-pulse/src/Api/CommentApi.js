import Axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants/constants";

var axios = Axios.create({
    baseURL: API_BASE_URL+"/comments/",
    timeout: 10000,
    headers:{
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    }
})

export const getCommentsByUserIdApi = (userId)=>{
    return axios.get("find/find-by-user-id",{
        params:{
            id: userId
        }
    })
}

export const getCommentsBySongIdApi = (songId)=>{
    return axios.get("find-comment-by-song-id",{
        params:{
            songId
        }
    })
}


export const postReplyApi = (reply)=>{
    return axios.post("save/post-reply",reply);
}

export const postCommentApi = (comment)=>{
    return axios.post("save/post-comment",comment);
}

export const editCommentApi = (comment)=>{
    return axios.put("save-comment",comment);
}