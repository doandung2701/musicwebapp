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

export const deleteAuthorApi = (authorId) => {
    console.log(authorId);
    return axios.delete(`delete-author-admin?id=${authorId}`); //doc lại axios
}

export const createAuthorApi = (author) => {
    let {authorName, thumbnail, briefDescription } = author;
    let newAuthor = [{
        authorName,
        thumbnai: thumbnail,
        briefDescription
    }];
    return axios.post("save-authors",newAuthor)
}

export const upImageAuthorApi = (thumbnail) => {
    console.log(thumbnail);
    return axios.post("save-author-thumbnail",thumbnail)
}

export const updateAuthorApi = (author) => {
    let {authorId, authorName, thumbnail, briefDescription } = author;
    let newAuthor = [{
        authorId,
        authorName,
        thumbnai: thumbnail,
        briefDescription
    }];
    return axios.put("save-authors",newAuthor)
}
