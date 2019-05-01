import {  CREATING_SINGER, CREATE_SINGER_SUCCESS, CREATE_SINGER_FAIL, DELETING_SINGER, DELETE_SINGER_SUCCESS, DELETE_SINGER_FAIL, UPDATING_SINGER, UPDATE_SINGER_SUCCESS, UPDATE_SINGER_FAIL, GETTING_SINGER_BY_ID, GET_SINGER_BY_ID_SUCCESS, GET_SINGER_BY_ID_FAIL, GETTING_SINGERS, GET_SINGERS_SUCCESS, GET_SINGERS_FAIL } from "../constants";
import { getAllSingersApi, createSingerApi, deleteSingerApi, getSingerByIdApi, updateSingerApi } from "../api/singerApi";
import { SINGER_SHOW_MODAL, SINGER_CLOSE_MODAL } from "./SingerConstants";
export const openModal=(data={
    id: 0,
    name: 0,
    description: ""
})=>({
    type:SINGER_SHOW_MODAL,
    payload:data
})
export const closeModal = () => ({
    type: SINGER_CLOSE_MODAL
})
const gettingSingers = ()=>({
    type: GETTING_SINGERS
})

const getSingerSuccess = (singers)=>({
    type: GET_SINGERS_SUCCESS,
    payload:singers //cú pháp ngắn gọn, = singers: singers
})

const getSingerFail = (error)=>({
    type: GET_SINGERS_FAIL,
    error
})

const creatingSinger = ()=>({
    type: CREATING_SINGER
})

const createSingerSuccess = (singer)=>({
    type: CREATE_SINGER_SUCCESS,
    payload:singer
})

const createSingerFail = (error)=>({
    type: CREATE_SINGER_FAIL,
    error
})

const deletingSinger = ()=>({
    type: DELETING_SINGER
})

const deleteSingerSuccess = (singerid)=>({
    type: DELETE_SINGER_SUCCESS,
    payload:singerid
})

const deleteSingerFail = (error)=>({
    type: DELETE_SINGER_FAIL,
    error
})

const updatingSinger = ()=>({
    type: UPDATING_SINGER
})

const updateSingerSuccess= (singer)=>({
    type: UPDATE_SINGER_SUCCESS,
    payload:singer
})

const updateSingerFail = error=>({
    type: UPDATE_SINGER_FAIL,
    error
})

const gettingSingerById = ()=>({
    type: GETTING_SINGER_BY_ID
})

const getSingerByIdSuccess = (singer)=>({
    type: GET_SINGER_BY_ID_SUCCESS,
    payload:singer
})

const getSingerByIdFail = (error)=>({
    type: GET_SINGER_BY_ID_FAIL,
    error
})

export const getAllSingers = ()=>{
    return dispatch=>{
        dispatch(gettingSingers());
        getAllSingersApi().then(data=>{            
            dispatch(getSingerSuccess(data.data))
        }).catch(error=>{
            if (error.response/*trong truong hop server khong sap*/){
                 /*ở chỗ này có thể gọi thêm alert để thông báo lỗi
                 error.response.data thì
                không cần phải cho thêm error vào dispatch, còn cho error vào
                dispatch thì thông báo lỗi ở component */
                dispatch(getSingerFail(error.response.data));
            }else{/*truong hop server sap*/
            /*ở chỗ này có thể gọi thêm alert để thông báo lỗi thì
                không cần phải cho thêm error vào dispatch, còn cho error vào
                dispatch thì thông báo lỗi ở component */
                dispatch(getSingerFail("Unexpected error occured"));
            }
        })
    }
}

export const createSinger = (singer)=>{
    /*singer gửi lên có các thuộc tính trong class Singer ở backend */
    return dispatch=>{
        dispatch(creatingSinger());
        createSingerApi(singer).then(data=>{
            dispatch(createSingerSuccess(data.data));//trả về để hiển thị luôn, hoặc có thể fetch lại toàn bộ list nếu muốn
        }).catch(error=>{
            if (error.response){
                dispatch(createSingerFail(error.response.data));
            }else{
                dispatch(createSingerSuccess("Unexpected error occured"));
            }
        })
    }
}

export const deleteSinger = (singerId)=>{
    return dispatch=>{
        dispatch(deletingSinger());
        deleteSingerApi(singerId).then(data=>{
            dispatch(deleteSingerSuccess(singerId));
        }).catch(error=>{
            if (error.response){
                dispatch(deleteSingerFail(error.response.data));
            }else{
                dispatch(deleteSingerFail("Unexpected error occured"));
            }
        })
    }
}

export const getSingerById = (singerId)=>{
    return dispatch=>{
        dispatch(gettingSingerById());
        getSingerByIdApi(singerId).then(data=>{
            dispatch(getSingerByIdSuccess(data.data));
        }).catch(error=>{
            if (error.response){
                dispatch(getSingerByIdFail(error.response.data));
            }else{
                dispatch(getSingerByIdFail("Unexpected error occured"));
            }
        })
    }
}

export const updateSinger = (singerId,singerDetail)=>{
    /*singerDetail gửi lên có các thuộc tính trong class Singer ở backend */
    return dispatch=>{
        dispatch(updatingSinger());
        updateSingerApi(singerId,singerDetail).then(data=>{
            dispatch(updateSingerSuccess(data.data));//trả về singer để hiển thị luôn, đỡ phải fetch lại
        }).catch(error=>{
            if (error.response){
                dispatch(updateSingerFail(error.response.data));
            }else{
                dispatch(updateSingerFail("Unexpected error occured"));
            }
        })
    }
}