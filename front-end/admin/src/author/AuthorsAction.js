import * as actionConstants from "../constants/index";
import * as authorsApi from "../api/authorApi";
import { AUTHOR_SHOW_MODAL, AUTHOR_CLOSE_MODAL } from "./AuthorConstants";

export const openModal = (data = {
    authorId: 0,
    name: '',
    thumbnail: null,
    description: '',
    user: 1,
    playlistSong: [],
})=> ({
    type: AUTHOR_SHOW_MODAL,
    payload: data
})

export const closeModal = () => ({
    type: AUTHOR_CLOSE_MODAL
})

const gettingAuthors = () => ({
    type: actionConstants.GETTING_AUTHORS
})

const getAuthorsSuccess = (authors) => ({
    type: actionConstants.GET_AUTHORS_SUCCESS,
    payload: authors
})

const getAuthorsFail = (error) => ({
    type: actionConstants.GET_AUTHORS_FAIL,
    error
})

const deletingAuthor = () => ({
    type: actionConstants.DELETING_AUTHOR
})

const deleteAuthorSuccess = (authorId) => ({
    type: actionConstants.DELETE_AUTHOR_SUCCESS,
    payload: authorId
})

const deleteAuthorFail = (error) => ({
    type: actionConstants.DELETE_AUTHOR_FAIL,
    error
})

const creatingAuthor = () => ({
    type: actionConstants.CREATING_AUTHOR
})

const createAuthorSuccess = (author) => ({
    type: actionConstants.CREATE_AUTHOR_SUCCESS,
    payload: author
})

const createAuthorFail = (error) => ({
    type: actionConstants.CREATE_AUTHOR_FAIL,
    error
})

const updatingAuthor = () => ({
    type: actionConstants.UPDATING_AUTHOR
})

const updateAuthorSuccess = (author) => ({
    type: actionConstants.UPDATE_AUTHOR_SUCCESS,
    payload: author
})

const updateAuthorFail = (error) => ({
    type: actionConstants.UPDATE_AUTHOR_FAIL,
    error
})


export const createAuthor = (author) => {
    return dispatch => {
        dispatch(creatingAuthor());
        authorsApi.upImageAuthorApi(author.thumbnail).then((rs) => {
            console.log(rs.data);
            author.thumbnail = rs.data;
            authorsApi.createAuthorApi(author).then(data=> {
                author = {
                    ...author,
                    authorId: data.data[0].authorId
                }
                dispatch(createAuthorSuccess(author));
            }).catch(error => {
                if (error.response){
                    dispatch(createAuthorFail(error.response.data));
                }else{
                    dispatch(createAuthorFail("Unexpected error occured"));
                }
            })
        }).catch((err)=> {
            if (err.response){
                dispatch(createAuthorFail(err.response.data));
            }else{
                dispatch(createAuthorFail("Unexpected error occured"));
            }
        })
    }
}

export const updateAuthor = (author) => {
    return dispatch => {
        dispatch(updatingAuthor());
        if (typeof(author.thumbnail) == "object") {
            authorsApi.upImageAuthorApi(author.thumbnail).then((rs) => {
                author.thumbnail = rs.data;
                authorsApi.updateAuthorApi(author).then((data) => {
                    dispatch(updateAuthorSuccess(author));
                }).catch(error => {
                    if (error.response){
                        dispatch(updateAuthorFail(error.response.data));
                    }else{
                        dispatch(updateAuthorFail("Unexpected error occured"));
                    }
                })
            }).catch((err) => {
                if (err.response){
                    dispatch(updateAuthorFail(err.response.data));
                }else{
                    dispatch(updateAuthorFail("Unexpected error occured"));
                }
            })
        } else if (typeof(author.thumbnail) == "string"){
            authorsApi.updateAuthorApi(author).then((data) => {
                dispatch(updateAuthorSuccess(author));
            }).catch(error => {
                if (error.response){
                    dispatch(updateAuthorFail(error.response.data));
                }else{
                    dispatch(updateAuthorFail("Unexpected error occured"));
                }
            })
        }
    }
}

export const getAllAuthors = () => {
    return (dispatch) => {
        dispatch(gettingAuthors);
        authorsApi.getAllAuthorsApi().then(data => {
            dispatch(getAuthorsSuccess(data.data));
        }).catch(error => {
            if (error.response /*trường hợp server không sập thì có phản hồi*/) {
                dispatch(getAuthorsFail(error.response.data));
            } else { /*trường hợp server sập*/
                dispatch(getAuthorsFail("Unexpected error occured"));
            }
        })
    }
}

export const deleteAuthor = (authorId) => {
    return dispatch => {
        dispatch(deletingAuthor());
        authorsApi.deleteAuthorApi(authorId).then((data) => {
            dispatch(deleteAuthorSuccess(authorId));
        }).catch(error => {
            if (error.response){
                dispatch(deleteAuthorFail(error.response.data));
            }else{
                dispatch(deleteAuthorFail("Unexpected error occured"));
            }
        })
    }
}
