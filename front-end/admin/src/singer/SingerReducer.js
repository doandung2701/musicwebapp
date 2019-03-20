import { GETTING_SINGERS, GET_SINGERS_SUCCESS, GET_SINGERS_FAIL, GETTING_SINGER_BY_ID, GET_SINGER_BY_ID_SUCCESS, GET_SINGER_BY_ID_FAIL } from "../constants";

var initialState = {
    singerList: [],//dùng cho mọi loại singerList luôn, về sau có lấy một list singer bằng tên hay gì đó
    //thì viết async action mới thôi, còn đâu ở trong action mới thì dispatch mấy cái gettingSingers...
    //còn nếu muốn hiển thị một lúc nhiều list thì một là thêm reducer, 2 là thêm array mới vô đây rồi 
    //thêm các action và constant tương ứng, tương tự với với song,...
    isGettingSingerList: false,
    error: null
}

export const singerListReducer = (state = initialState
    /*trong trường hợp không hiểu thì đây là es6 default argument
        ,nghĩa là lúc mới deploy thì chưa có state => lấy cái initialState làm state khởi tạo luôn*/
    ,
    action) => {
    switch(action.type){
        case GETTING_SINGERS:
            return {
                ...state,//es6 spread syntax, lấy toàn bộ thuộc tính của state cho vào state mới
                isGettingSingerList: true//chỉ định là thuộc tính này thay đổi
            }
        case GET_SINGERS_SUCCESS:
        return {
            ...state,
            isGettingSingerList: false,
            singerList: action.singers
        }
        case GET_SINGERS_FAIL:
            return {
                ...state,
                isGettingSingerList: false,
                error: action.error
            }
        default: return state;
    }
}

var initialState1={
    singer: {},
    isGettingSinger: false,
    error: null
}

export const singerReducer = (state=initialState1,action)=>{
    switch(action.type){
        case GETTING_SINGER_BY_ID:
            return {
                ...state,
                isGettingSinger: true
            }
        case GET_SINGER_BY_ID_SUCCESS:
        return {
            ...state,
            isGettingSinger: false,
            singer: action.singer
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
