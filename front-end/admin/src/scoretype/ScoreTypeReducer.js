import { GETTING_ALL_SCORETYPE, GET_SCORETYPE_SUCCESS, GET_SCORETYPE_FAIL, GETTING_SCORETYPE_BY_ID, GET_SCORETYPE_BY_ID_SUCCESS, GET_SCORETYPE_BY_ID_FAIL, CREATING_SCORETYPE, CREATE_SCORETYPE_SUCCESS, CREATE_SCORETYPE_FAIL, DELETING_SCORETYPE, DELETE_SCORETYPE_SUCCESS, DELETE_SCORETYPE_FAIL, UPDATING_SCORETYPE, UPDATE_SCORETYPE_SUCCESS, UPDATE_SCORETYPE_FAIL, SCORETYPE_SHOW_MODAL, SCORETYPE_CLOSE_MODAL } from "./ScoreTypeConstants";
import { openNotificationWithIcon } from "../common/notification";
var initialStateModal = {
    isShow: false,
    scoreType: {
        scoreId:0,
        scoreValue:0,
    },
    isLoading: false,
    error: null
}
export const ScoreTypeModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case SCORETYPE_SHOW_MODAL:      
        console.log(action.payload);
          
            return {
                ...state,
                isShow: true,
                scoreType:action.payload
            }
        case SCORETYPE_CLOSE_MODAL:{
            return {
                ...state,
                isShow:false
            }
        }    
        case UPDATING_SCORETYPE: {
            return {
                ...state,
                isLoading: true
            }

        }
        case UPDATE_SCORETYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case UPDATE_SCORETYPE_FAIL: {
            return {
                ...state,
                isLoading: false,
                error:action.error
            }
        }

        //create
        case CREATING_SCORETYPE: {
            return {
                ...state,
                isLoading: true
            }

        }
        case CREATE_SCORETYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case CREATE_SCORETYPE_FAIL: {
            return {
                ...state,
                isLoading: false,
                error:action.error
            }
        }
        default:
        return state;
    }
}

var initialState = {
    scoretypeList: [],
    loadingGetAll: false,
    isloadingDelete: false,
    error: null,
}
export const ScoretypeListReducer = (state = initialState, action) => {
    switch (action.type) {
        //action get all
        case GETTING_ALL_SCORETYPE:
            return {
                ...state,//es6 spread syntax, lấy toàn bộ thuộc tính của state cho vào state mới
                loadingGetAll: true//chỉ định là thuộc tính này thay đổi
            }
        case GET_SCORETYPE_SUCCESS:
            return {
                ...state,
                loadingGetAll: false,
                scoretypeList: action.payload
            }
        case GET_SCORETYPE_FAIL:
            return {
                ...state,
                loadingGetAll: false,
                error: action.error
            }

        //case create scoretype
        case CREATING_SCORETYPE:
            return {
                ...state,
            }
        case CREATE_SCORETYPE_SUCCESS:
        openNotificationWithIcon('success', 'ScoreType', 'Create scoretype success');

            return {
                ...state,
                scoretypeList: [...state.scoretypeList, action.payload],
            }
        case CREATE_SCORETYPE_FAIL:
        openNotificationWithIcon('error', 'ScoreType', 'Create scoretype error');

            return {
                ...state,
                error: action.error
            }
        //case delete scoretype
        case DELETING_SCORETYPE:
            return {
                ...state,
                isloadingDelete: true
            }
        case DELETE_SCORETYPE_SUCCESS:
            var scoretypeResult = state.scoretypeList.filter(item => item.scoreId != action.payload);
            openNotificationWithIcon('success', 'ScoreType', 'Delete scoretype success');
            return {
                ...state,
                scoretypeList: scoretypeResult,
                isloadingDelete: false
            }
        case DELETE_SCORETYPE_FAIL:
            openNotificationWithIcon('error', 'ScoreType', 'Delete scoretype error');
            return {
                ...state,
                isloadingDelete: false,
                error: action.error
            }
        case UPDATING_SCORETYPE:{
            return {
                ...state
            }
        }
        case UPDATE_SCORETYPE_SUCCESS:
        openNotificationWithIcon('success', 'ScoreType', 'Update scoretype success');

            var index = state.scoretypeList.findIndex(item => item.scoreId == action.payload.scoreId);
            let scoretypeListNew = state.scoretypeList;
            scoretypeListNew[index] = action.payload;
            return {
                ...state,
                scoretypeList: scoretypeListNew,
            }
        case UPDATE_SCORETYPE_FAIL:
        openNotificationWithIcon('error', 'ScoreType', 'Update scoretype error');

            return {
                ...state,
            }

        default:
            return state;
    }
}
var initialState1 = {
    scoretype: {},
    isloadingGetById: false,
    error: null,
}
export const scoretypeReducer = (state = initialState1, action) => {
    switch (action.type) {
        case GETTING_SCORETYPE_BY_ID:
            return {
                ...state,
                isloadingGetById: true
            }
        case GET_SCORETYPE_BY_ID_SUCCESS:
            return {
                ...state,
                isloadingGetById: false,
                scoretype: action.payload
            }
        case GET_SCORETYPE_BY_ID_FAIL:
            return {
                ...state,
                isloadingGetById: false,
                error: action.error
            }
        default: return state;
    }
}