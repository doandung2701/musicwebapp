import { ALBUM_SHOW_MODAL, ALBUM_CLOSE_MODAL, OPENING_ALBUM_MODAL, CLOSING_ALBUM_MODAL } from "./AlbumConstants";
import { GETTING_ALBUMS, GET_ALBUMS_SUCCESS, GET_ALBUMS_FAIL, CREATING_ALBUM, CREATE_ALBUM_SUCCESS, CREATE_ALBUM_FAIL, DELETING_ALBUM, DELETE_ALBUM_SUCCESS, DELETE_ALBUM_FAIL, UPDATING_ALBUM, UPDATE_ALBUM_SUCCESS, UPDATE_ALBUM_FAIL, GETTING_ALBUM_BY_ID, GET_ALBUM_BY_ID_SUCCESS, GET_ALBUM_BY_ID_FAIL } from "../constants";
import { getAlAlbumsApi, createAlbumApi, deleteAlbumApi, updateAlbumApi, getAlbumByIdApi } from "../api/albumApi";

export const closeModal=()=>({
    type:ALBUM_CLOSE_MODAL
})

const gettingAlbums = ()=>({
    type: GETTING_ALBUMS
})

const getAlbumsSuccess = (albums)=>({
    type: GET_ALBUMS_SUCCESS,
    payload:albums //cú pháp ngắn gọn, = singers: singers
})

const getAlbumsFail = (error)=>({
    type: GET_ALBUMS_FAIL,
    error
})

const creatingAlbum = ()=>({
    type: CREATING_ALBUM
})

export const createAlbumSuccess = (album)=>({
    type: CREATE_ALBUM_SUCCESS,
    payload:album
})

const createAlbumFail = (error)=>({
    type: CREATE_ALBUM_FAIL,
    error
})

const deletingAlbum = ()=>({
    type: DELETING_ALBUM
})

const deleteAlbumSuccess = (albumId)=>({
    type: DELETE_ALBUM_SUCCESS,
    payload:albumId
})

const deleteAlbumFail = (error)=>({
    type: DELETE_ALBUM_FAIL,
    error
})

const updatingAlbum = ()=>({
    type: UPDATING_ALBUM
})

export const updateAlbumSuccess= (album)=>({
    type: UPDATE_ALBUM_SUCCESS,
    payload:album
})

const updateAlbumFail = error=>({
    type: UPDATE_ALBUM_FAIL,
    error
})

const gettingAlbumById = ()=>({
    type: GETTING_ALBUM_BY_ID
})

const getAlbumByIdSuccess = (album)=>({
    type: GET_ALBUM_BY_ID_SUCCESS,
    payload:album
})

const getAlbumByIdFail = (error)=>({
    type: GET_ALBUM_BY_ID_FAIL,
    error
})
//lay toan bo album
export const getAllAlbums = ()=>{
    return dispatch=>{
        dispatch(gettingAlbums());
        getAlAlbumsApi().then(data=>{            
            dispatch(getAlbumsSuccess(data.data))
        }).catch(error=>{
            if (error.response/*trong truong hop server khong sap*/){
                 /*ở chỗ này có thể gọi thêm alert để thông báo lỗi
                 error.response.data thì
                không cần phải cho thêm error vào dispatch, còn cho error vào
                dispatch thì thông báo lỗi ở component */
                dispatch(getAlbumsFail(error.response.data));
            }else{/*truong hop server sap*/
            /*ở chỗ này có thể gọi thêm alert để thông báo lỗi thì
                không cần phải cho thêm error vào dispatch, còn cho error vào
                dispatch thì thông báo lỗi ở component */
                dispatch(getAlbumsFail("Unexpected error occured"));
            }
        })
    }
}
//tao moi album
export const createAlbum = (album)=>{
    /*singer gửi lên có các thuộc tính trong class Singer ở backend */
    return dispatch=>{
        dispatch(creatingAlbum());
        createAlbumApi(album).then(data=>{
            dispatch(createAlbumSuccess(data.data));//trả về để hiển thị luôn, hoặc có thể fetch lại toàn bộ list nếu muốn
        }).catch(error=>{
            if (error.response){
                dispatch(createAlbumFail(error.response.data));
            }else{
                dispatch(createAlbumFail("Unexpected error occured"));
            }
        })
    }
}
//xoas 1 album
export const deleteAlbum = (albumId)=>{
    return dispatch=>{
        dispatch(deletingAlbum());
        deleteAlbumApi(albumId).then(data=>{
            dispatch(deleteAlbumSuccess(albumId));
        }).catch(error=>{
            if (error.response){
                dispatch(deleteAlbumFail(error.response.data));
            }else{
                dispatch(deleteAlbumFail("Unexpected error occured"));
            }
        })
    }
}
//update album
export const updateAlbum = (albumDetail)=>{
    /*singerDetail gửi lên có các thuộc tính trong class Singer ở backend */
    return dispatch=>{
        dispatch(updatingAlbum());
        updateAlbumApi(albumDetail).then(data=>{
            dispatch(updateAlbumSuccess(data.data));//trả về singer để hiển thị luôn, đỡ phải fetch lại
        }).catch(error=>{
            if (error.response){
                dispatch(updateAlbumFail(error.response.data));
            }else{
                dispatch(updateAlbumFail("Unexpected error occured"));
            }
        })
    }
}
const openingModal=()=>({
    type:ALBUM_SHOW_MODAL
})
export const openModal=(id)=>{
    return dispatch=>{
        dispatch(openingModal())
        getAlbumByIdApi(id).then(data=>{
            dispatch(getAlbumByIdSuccess(data.data))
        }).error(error=>{
            if (error.response){
                dispatch(getAlbumByIdFail(error.response.data));
            }else{
                dispatch(getAlbumByIdFail("Unexpected error occured"));
            }
        })
    }
}
export const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};