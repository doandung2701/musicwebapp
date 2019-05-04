import { ACCESS_TOKEN, API_BASE_URL } from "../constants/constants";
import Axios from "axios";
import { timeout } from "q";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
const axios = Axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000
})
export const likeSongApi = (songId,userId)=>{
    return Axios.put(API_BASE_URL+"/users/like-song",null,{
        params: {
            userId,
            songId
        }
    })
}

export const changeAvaApi = (data,userId)=>{
    return axios.put(`/users/${userId}/upload-image`,data,{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    });
}
