import { GETTING_ALL_AUTHORS, GET_ALL_AUTHORS_SUCCESS, GET_ALL_AUTHORS_FAIL, GETTING_AUTHOR_BY_ID, GET_AUTHOR_BY_ID_SUCCESS, GET_AUTHOR_BY_ID_FAIL, GETTING_AUTHORS_BY_NAME, GET_AUTHORS_BY_NAME_SUCCESS, GET_AUTHORS_BY_NAME_FAIL, CREATING_AUTHORS, CREATE_AUTHORS_FAIL, CREATE_AUTHORS_SUCCESS, UPDATING_AUTHOR, UPDATE_AUTHOR_SUCCESS, UPDATE_AUTHOR_FAIL, DELETING_AUTHOR, DELETE_AUTHOR_SUCCESS, DELETE_AUTHOR_FAIL } from "./AuthorConstants";
import { getAllAuthorsApi, getAuthorsByNameApi, addAuthorsApi, updateAuthorApi, deleteAuthorApi } from "../api/authorApi";

const gettingAllAuthors = ()=>({
    type: GETTING_ALL_AUTHORS
})

const getAllAuthorsSuccess =(authors)=>({
    type: GET_ALL_AUTHORS_SUCCESS,
    payload: authors
})

const getAllAuthorsFail = (error)=>({
    type: GET_ALL_AUTHORS_FAIL,
    error
})

const gettingAuthorById =()=>({
    type: GETTING_AUTHOR_BY_ID
})

const getAuthorByIdSuccess =(author)=>({
    type: GET_AUTHOR_BY_ID_SUCCESS,
    payload: author
})

const getAuthorByIdFail =(error)=>({
    type: GET_AUTHOR_BY_ID_FAIL,
    error
})

const gettingAuthorsByName = ()=>({
    type: GETTING_AUTHORS_BY_NAME
})

const getAuthorsByNameSuccess =(author)=>({
    type: GET_AUTHORS_BY_NAME_SUCCESS,
    payload: author
})

const getAuthorsByNameFail =()=>({
    type: GET_AUTHORS_BY_NAME_FAIL
})

const creatingAuthors = () => ({
    type: CREATING_AUTHORS
})

const createAuthorsSuccess = (authors) => ({
    type: CREATE_AUTHORS_SUCCESS,
    payload: authors
})

const createAuthorsFail = (error) => ({
    type: CREATE_AUTHORS_FAIL,
    error
})

const updatingAuthor = () => ({
    type: UPDATING_AUTHOR
})

const updateAuthorSuccess = (authors) => ({
    type: UPDATE_AUTHOR_SUCCESS,
    payload: authors
})

const updateAuthorFail = error => ({
    type: UPDATE_AUTHOR_FAIL,
    error
})

const deletingAuthor = () => ({
    type: DELETING_AUTHOR
})

const deleteAuthorSuccess = (data) => ({
    type: DELETE_AUTHOR_SUCCESS,
    payload: data
})

const deleteAuthorFail = (error) => ({
    type: DELETE_AUTHOR_FAIL,
    error
})

export const getAllAuthors= ()=>{
    return dispatch=>{
        dispatch(gettingAllAuthors());
        getAllAuthorsApi().then(data=>{
            dispatch(getAllAuthorsSuccess(data.data));
        }).catch(error=>{
            if (error.response/*trong truong hop server khong sap*/) {
                /*ở chỗ này có thể gọi thêm alert để thông báo lỗi
                error.response.data thì
               không cần phải cho thêm error vào dispatch, còn cho error vào
               dispatch thì thông báo lỗi ở component */
                dispatch(getAllAuthorsFail(error.response.data));
            } else {/*truong hop server sap*/
                /*ở chỗ này có thể gọi thêm alert để thông báo lỗi thì
                    không cần phải cho thêm error vào dispatch, còn cho error vào
                    dispatch thì thông báo lỗi ở component */
                dispatch(getAllAuthorsFail("Unexpected error occured"));
            }
        })
    }
}

export const getAuthorById=async ()=>{
    return async dispatch=>{
        dispatch(gettingAuthorById());
        try{
            let data = await getAllAuthorsApi();
            dispatch(getAuthorByIdSuccess(data.data));
        }catch (err){
            dispatch(getAuthorByIdFail());
        }
    }
}

export const getAuthorsByName = (authorName) => {
    return dispatch => {
        dispatch(gettingAuthorsByName());
        getAuthorsByNameApi(authorName).then(data => {
            dispatch(getAuthorsByNameSuccess(data.data));
        }).catch(error => {
            if (error.response) {
                dispatch(getAuthorsByNameFail(error.response.data));
            } else {
                dispatch(getAuthorsByNameFail("Unexpected error occured"));
            }
        })
    }
}

export const createAuthors = (author) => {
    /*scoreType gửi lên có các thuộc tính trong class Authors ở backend */
    return dispatch => {
        dispatch(creatingAuthors());
        addAuthorsApi(author).then(data => {
            dispatch(createAuthorsSuccess(data.data));//trả về để hiển thị luôn, hoặc có thể fetch lại toàn bộ list nếu muốn
        }).catch(error => {
            if (error.response) {
                dispatch(createAuthorsFail(error.response.data));
            } else {
                dispatch(createAuthorsFail("Unexpected error occured"));
            }
        })
    }
}

export const updateScoreType = (authorId, authorDetail) => {
    /*scoreTypeDetail gửi lên có các thuộc tính trong class ScoreType ở backend */
    return dispatch => {
        dispatch(updatingAuthor());
        updateAuthorApi(authorId, authorDetail).then(data => {
            dispatch(updateAuthorSuccess(data.data));//trả về scoreType để hiển thị luôn, đỡ phải fetch lại
        }).catch(error => {
            if (error.response) {
                dispatch(updateAuthorFail(error.response.data));
            } else {
                dispatch(updateAuthorFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteAuthor = (AuthorId) => {
    return dispatch => {
        dispatch(deletingAuthor());
        deleteAuthorApi(AuthorId).then(data => {
            dispatch(deleteAuthorSuccess(AuthorId));
        }).catch(error => {
            if (error.response) {
                dispatch(deleteAuthorFail(error.response.data));
            } else {
                dispatch(deleteAuthorFail("Unexpected error occured"));
            }
        })
    }
}
