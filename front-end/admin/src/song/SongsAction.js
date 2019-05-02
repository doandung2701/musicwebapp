import * as actionConstants from "../constants/index";
import * as songApi from "../api/songApi";

const gettingSongs = () => ({
    type: actionConstants.GETTING_SONGS
})

const getSongSuccess = (users) => ({
    type: actionConstants.GET_SONGS_SUCCESS,
    payload: users
})

const getSongFail = (error) => ({
    type: actionConstants.GET_SONGS_FAIL,
    error
})

export const getAllSongs = () => {
    return (dispatch) => {
        dispatch(gettingSongs);
        songApi.getAllSongsApi().then(data => {
            dispatch(getSongSuccess(data.data));
        }).catch(error => {
            if (error.response /*trường hợp server không sập thì có phản hồi*/) {
                dispatch(getSongFail(error.response.data));
            } else { /*trường hợp server sập*/
                dispatch(getSongFail("Unexpected error occured"));
            }
        })
    }
}
