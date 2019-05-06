import * as actionConstants from "../constants/index";
import * as authorsApi from "../api/authorApi";

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

