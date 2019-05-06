import Axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const axios = Axios.create({
    baseURL: API_BASE_URL + "/songs/",
    timeout: 5000
})

export const getAllSongWithPagingApi = (page) => {
    return axios.get("find-paging", {
        params: {
            page,
            rows: 12
        }
    })
}

export const getSongsBySingerPagingApi = (page, id) => {
    return axios.get("find-paging-by-singer", {
        params: {
            page,
            rows: 12,
            id
        }
    })
}

export const getTop5LikeApi = () => {
    return axios.get("find-lovest-jpa");
}


export const getTrendingSongsApi = () => {
    return axios.get("find-trending-jpa");
}

export const getRandom4JazzApi = () => {
    return axios.get("find/find-by-cate-limit-4", {
        params: {
            id: 1
        }
    })
}

export const getRandom4PopApi = () => {
    return axios.get("find/find-by-cate-limit-4", {
        params: {
            id: 3
        }
    })
}


export const get8NewApi = () => {
    return axios.get("find-newest-jpa");
}

export const getSongsByNameApi = (name) => axios.get('find-by-name', {
    params: {
        name
    }
})

export const getTopPopularBySingerIdApi = (id) => {
    return axios.get(`find-top-popular-by-singer`, {
        params: {
            id
        }
    })
}

export const getSongByIdApi = (id) => {
    return axios.get(`/find-by-id/${id}`)
}

export const getSongByUserIdApi = (page, id) => {
    return axios.get("find-paging-by-user", {
        params: {
            page,
            id,
            rows: 7
        }
    })
}

export const getChartSongByCatIdApi = (id) => {
    return axios.get("find-charts-jpa", {
        params: {
            id
        }
    })
}

export const getSongsByAlbumsIdApi = (page, id) => {
    return axios.get("find-paging-by-album", {
        params: {
            page,
            id,
            rows: 10
        }
    })
}

export const getSongsByPlayListIdApi = (page, id) => {
    console.log(id);
    return axios.get("find-paging-by-playlist", {
        params: {
            page,
            id,
            rows: 10
        }
    })
}

export const createSong = (data) => {
    console.log(data);
    return axios.post("users/upload-song", data);
}
export const uploadImageSong = (id, data) => {
    return axios.put(`${id}/upload-image-song`, data);
}
export const uploadSongFile = (id, data) => {
    return axios.put(`${id}/upload-song`, data);
}

export const getRecommendedSongsApi = (ids) => {
    let url = "find-recommended-songs?ids=";
    if (ids.length === 1) {
        url += ids[0];
    } else {
        for (var i = 0; i < ids.length - 1; i++) {
            url += ids[i] + "&ids=";
        }
        url += ids[i];
    }
    return axios.get(url);
}

export const increaseListenCountApi = (songId)=>{
    if (!songId){
        return;
    }
    return axios.put("increase-listen-count",null,{
        params: {
            songId
        }
    })
}