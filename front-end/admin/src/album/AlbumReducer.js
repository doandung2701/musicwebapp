import { openNotificationWithIcon } from "../common/notification";
import { ALBUM_SHOW_MODAL, ALBUM_CLOSE_MODAL } from "./AlbumConstants";
import { UPDATING_ALBUM, UPDATE_ALBUM_SUCCESS, UPDATE_ALBUM_FAIL, CREATING_ALBUM, CREATE_ALBUM_SUCCESS, CREATE_ALBUM_FAIL, GETTING_ALBUMS, GET_ALBUMS_SUCCESS, GET_ALBUMS_FAIL, DELETING_ALBUM, DELETE_ALBUM_SUCCESS, DELETE_ALBUM_FAIL, GET_ALBUM_BY_ID_FAIL, GET_ALBUM_BY_ID_SUCCESS } from "../constants";

//Singer Modal Reducer
var initialStateModal = {
    isShow: false,
    album: {
        id: 0,
        albumName: "",
        thumbnail:null,
        createdDate:null,
        songs:[],
        singer:null
    },
    isLoading: false,
    error: null
}
export const AlbumModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case ALBUM_CLOSE_MODAL:
            return {
                ...state,
                isShow:false
            }
        case ALBUM_SHOW_MODAL:
        return {
            ...state,
            isShow:true
        }    
        case GET_ALBUM_BY_ID_SUCCESS:
            return {
                ...state,
                isShow: true,
                album: action.payload
            }
        case GET_ALBUM_BY_ID_FAIL: {
            openNotificationWithIcon('error', 'Album', 'Get Detail Album fail');
            return {
                ...state,
                isShow: false
            }
        }
        case UPDATING_ALBUM: {
            return {
                ...state,
                isLoading: true
            }

        }
        case UPDATE_ALBUM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case UPDATE_ALBUM_FAIL: {
            openNotificationWithIcon('error', 'Album', action.error);
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }

        //create
        case CREATING_ALBUM: {
            return {
                ...state,
                isLoading: true
            }

        }
        case CREATE_ALBUM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case CREATE_ALBUM_FAIL: {
            openNotificationWithIcon('error', 'Album', action.error);
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        default:
            return state;
    }
}








var initialState = {
    albumList: [],
    isGettingAlbumList: false,
    isloadingDelete: false,
    error: null
}

export const albumsListReducer = (state = initialState
    /*trong trường hợp không hiểu thì đây là es6 default argument
        ,nghĩa là lúc mới deploy thì chưa có state => lấy cái initialState làm state khởi tạo luôn*/
    ,
    action) => {
    switch (action.type) {
        case GETTING_ALBUMS:
            return {
                ...state,//es6 spread syntax, lấy toàn bộ thuộc tính của state cho vào state mới
                isGettingAlbumList: true//chỉ định là thuộc tính này thay đổi
            }
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                isGettingAlbumList: false,
                albumList: action.payload
            }
        case GET_ALBUMS_FAIL:
            return {
                ...state,
                isGettingAlbumList: false,
                error: action.error
            }
        case CREATING_ALBUM: {
            return {
                ...state
            }

        }
        case CREATE_ALBUM_SUCCESS:
            openNotificationWithIcon('success', 'Album', 'Create Album success');

            return {
                ...state,
                albumList: [...state.albumList, action.payload]
            }
        case CREATE_ALBUM_FAIL: {
            openNotificationWithIcon('error', 'Album', 'Create Album error');

            return {
                ...state,
                error: action.error
            }
        }
        //case delete scoretype
        case DELETING_ALBUM:
            return {
                ...state,
                isloadingDelete: true
            }
        case DELETE_ALBUM_SUCCESS:
            var albumListResult = state.albumList.filter(item => item.id != action.payload);
            openNotificationWithIcon('success', 'Album', 'Delete Album success');
            return {
                ...state,
                albumList: albumListResult,
                isloadingDelete: false
            }
        case DELETE_ALBUM_FAIL:
            openNotificationWithIcon('error', 'Album', 'Delete Album error');
            return {
                ...state,
                isloadingDelete: false,
                error: action.error
            }

        case UPDATING_ALBUM: {
            return {
                ...state
            }
        }
        case UPDATE_ALBUM_SUCCESS:
            openNotificationWithIcon('success', 'Album', 'Update Album success');

            var index = state.albumList.findIndex(item => item.id == action.payload.id);
            let albumListNew = state.albumList;
            albumListNew[index] = action.payload;
            return {
                ...state,
                albumList: albumListNew,
            }
        case UPDATE_ALBUM_FAIL:
            openNotificationWithIcon('error', 'Album', 'Update Album error');

            return {
                ...state,
            }

        default: return state;
    }
}
//nếu muốn thêm sửa một lúc nhiều thằng thì liên hệ dũng nó viết api cho, cái này t mặc định là sửa 1 thằng 1 lần
