import { GETTING_SINGERS, GET_SINGERS_SUCCESS, GET_SINGERS_FAIL, GETTING_SINGER_BY_ID, GET_SINGER_BY_ID_SUCCESS, GET_SINGER_BY_ID_FAIL, UPDATING_SINGER, UPDATE_SINGER_SUCCESS, UPDATE_SINGER_FAIL, CREATING_SINGER, CREATE_SINGER_SUCCESS, CREATE_SINGER_FAIL, DELETING_SINGER, DELETE_SINGER_SUCCESS, DELETE_SINGER_FAIL } from "../constants";
import { SINGER_SHOW_MODAL, SINGER_CLOSE_MODAL } from "./SingerConstants";
import { openNotificationWithIcon } from "../common/notification";

//Singer Modal Reducer
var initialStateModal = {
    isShow: false,
    singer: {
        id: '',
        name: "",
        description: "",
        thumbnail: ""
    },
    isLoading: false,
    error: null
}
export const SingerModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case SINGER_SHOW_MODAL:
            return {
                ...state,
                isShow: true,
                singer: action.payload
            }
        case SINGER_CLOSE_MODAL: {
            return {
                ...state,
                isShow: false
            }
        }
        case UPDATING_SINGER: {
            return {
                ...state,
                isLoading: true
            }

        }
        case UPDATE_SINGER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case UPDATE_SINGER_FAIL: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }

        //create
        case CREATING_SINGER: {
            return {
                ...state,
                isLoading: true
            }

        }
        case CREATE_SINGER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case CREATE_SINGER_FAIL: {
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
    singerList: [],//dùng cho mọi loại singerList luôn, về sau có lấy một list singer bằng tên hay gì đó
    //thì viết async action mới thôi, còn đâu ở trong action mới thì dispatch mấy cái gettingSingers...
    //còn nếu muốn hiển thị một lúc nhiều list thì một là thêm reducer, 2 là thêm array mới vô đây rồi 
    //thêm các action và constant tương ứng, tương tự với với song,...
    isGettingSingerList: false,
    isloadingDelete: false,
    error: null
}

export const singerListReducer = (state = initialState
    /*trong trường hợp không hiểu thì đây là es6 default argument
        ,nghĩa là lúc mới deploy thì chưa có state => lấy cái initialState làm state khởi tạo luôn*/
    ,
    action) => {
    switch (action.type) {
        case GETTING_SINGERS:
            return {
                ...state,//es6 spread syntax, lấy toàn bộ thuộc tính của state cho vào state mới
                isGettingSingerList: true//chỉ định là thuộc tính này thay đổi
            }
        case GET_SINGERS_SUCCESS:
            return {
                ...state,
                isGettingSingerList: false,
                singerList: action.payload
            }
        case GET_SINGERS_FAIL:
            return {
                ...state,
                isGettingSingerList: false,
                error: action.error
            }
        case CREATING_SINGER: {
            return {
                ...state
            }

        }
        case CREATE_SINGER_SUCCESS:
            openNotificationWithIcon('success', 'Singer', 'Create Singer success');

            return {
                ...state,
                singerList: [...state.singerList, action.payload]
            }
        case CREATE_SINGER_FAIL: {
            openNotificationWithIcon('error', 'Singer', 'Create Singer error');

            return {
                ...state,
                error: action.error
            }
        }
        //case delete scoretype
        case DELETING_SINGER:
            return {
                ...state,
                isloadingDelete: true
            }
        case DELETE_SINGER_SUCCESS:
            var singerListResult = state.singerList.filter(item => item.id != action.payload);
            openNotificationWithIcon('success', 'Singer', 'Delete Singer success');
            return {
                ...state,
                singerList: singerListResult,
                isloadingDelete: false
            }
        case DELETE_SINGER_FAIL:
            openNotificationWithIcon('error', 'Singer', 'Delete Singer error');
            return {
                ...state,
                isloadingDelete: false,
                error: action.error
            }

        case UPDATING_SINGER: {
            return {
                ...state
            }
        }
        case UPDATE_SINGER_SUCCESS:
            openNotificationWithIcon('success', 'Singer', 'Update Singer success');

            var index = state.singerList.findIndex(item => item.id == action.payload.id);
            let singerListNew = state.singerList;
            singerListNew[index] = action.payload;
            return {
                ...state,
                scoretypeList: singerListNew,
            }
        case UPDATE_SINGER_FAIL:
            openNotificationWithIcon('error', 'Singer', 'Update Singer error');

            return {
                ...state,
            }

        default: return state;
    }
}

var initialState1 = {
    singer: {},
    isGettingSinger: false,
    error: null
}

export const singerReducer = (state = initialState1, action) => {
    switch (action.type) {
        case GETTING_SINGER_BY_ID:
            return {
                ...state,
                isGettingSinger: true
            }
        case GET_SINGER_BY_ID_SUCCESS:
            return {
                ...state,
                isGettingSinger: false,
                singer: action.payload
            }
        case GET_SINGER_BY_ID_FAIL:
            return {
                ...state,
                isGettingSinger: false,
                error: action.error
            }
        //viết nốt nhé
        default: return state;
    }
}

//nếu muốn thêm sửa một lúc nhiều thằng thì liên hệ dũng nó viết api cho, cái này t mặc định là sửa 1 thằng 1 lần
