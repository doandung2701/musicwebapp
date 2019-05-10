import Axios from "axios";
import {
    API_BASE_URL
} from "../constants";

var axios = Axios.create({
    baseURL: API_BASE_URL + "comments/",
    timeout: 10000
})

export const getAllCommentsApi = () => {
    return axios.get("find-all", {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    });
}

export const getCommentsBySongIdApi = (id) => {
    return axios.get(`find-by-song-id/${id}`, {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const getCommentsByUserIdApi = (id) => {
    return axios.get(`find-by-user-id/${id}`, {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const getCommentByIdApi = (id) => {
    return axios.get(`find-by-id/${id}`, {
        headers: {
            'Content-Security-Policy': 'default-src https:'
        }
    })
}

export const createCommentApi = (comment) => {
    return axios.post(`save-comment`, comment);
}

export const updateCommentApi = (commentId, commentDetail) => {
    return axios.put(`save-commnet/${commentId}`,commentDetail);
}

export const deleteCommentApi = (id) => {
    return axios.delete(`delete-comment?id=${id}`)
}