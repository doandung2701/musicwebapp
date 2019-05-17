import * as actionConstants from '../constants/index'
import { openNotificationWithIcon } from "../common/notification";
import { RADIO_SHOW_MODAL, RADIO_CLOSE_MODAL } from "./RadioConstants";

const initialStateModal = {
    isShow: false,
    radio: {
        songId: 0,
        songName: '',
        thumbnail: '',
        songSrc: ''
    },
    isLoading: false,
    error: null
}

export const radioModalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case RADIO_SHOW_MODAL:
            return {
                ...state,
                isShow: true,
                radio: action.payload
            }
        case RADIO_CLOSE_MODAL:
            return {
                ...state,
                isShow: false
            }
        case actionConstants.UPDATING_AUTHOR:
            return {
                ...state,
                isLoading: true
            }
        case actionConstants.UPDATE_AUTHOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.UPDATE_AUTHOR_FAIL: 
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actionConstants.CREATING_AUTHOR: {
            return {
                ...state,
                isLoading: true
            }

        }
        case actionConstants.CREATE_AUTHOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isShow: false
            }
        case actionConstants.CREATE_AUTHOR_FAIL: {
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

const initialSate = {
    radioList: [],
    isGettingRadioList: false,
    isLoadingDelete: false,
    isUpdating: false,
    error: null
}

export const radioListReducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionConstants.GETTING_RADIOS:
            return {
                ...state,
                isGettingRadioList: true
            }
        case actionConstants.GET_RADIOS_SUCCESS:
            let payload = [...action.payload];
            return {
                ...state,
                isGettingRadioList: false,
                radioList: payload
            }
        case actionConstants.GET_RADIOS_FAIL:
            return {
                ...state,
                isGettingRadioList: false,
                error: state.error
            }
        case actionConstants.DELETING_RADIO:
            return {
                ...state,
                isLoadingDelete: true,
            }
        case actionConstants.DELETE_RADIO_SUCCESS:
            var radioListResult = state.radioList.filter(item => item.songId != action.payload)
            openNotificationWithIcon('success', 'Radio', 'Delete Radio success');
            console.log(radioListResult);
            return {
                ...state,
                radioList: radioListResult,
                isLoadingDelete: false,
            }
        case actionConstants.DELETE_RADIO_FAIL:
            openNotificationWithIcon('error', 'Radio', 'Delete Radio error');
            return {
                ...state,
                isLoadingDelete: false,
                error: action.error
            }
        case actionConstants.CREATING_RADIO:
            return {
                ...state
            }
        case actionConstants.CREATE_RADIO_SUCCESS:
            openNotificationWithIcon('success', 'Radio', 'Create Radio success');
            console.log(action.payload);
            return {
                ...state,
                radioList: [...state.radioList, action.payload] //trả về mảng với list ban đầu với, phần tử mới thêm vào
            }
        case actionConstants.CREATE_RADIO_FAIL:
            return {
                ...state,
                error: action.error
            }
            case actionConstants.UPDATE_RADIO_SUCCESS:
            openNotificationWithIcon('success', 'Radio', 'Update Radio success');
            var index = state.radioList.findIndex(item => item.songId == action.payload.songId);
            let radioNew = state.radioList;
            radioNew[index] = action.payload;
            return {
                ...state,
                radioList: radioNew
            }
        case actionConstants.UPDATE_RADIO_FAIL: 
        openNotificationWithIcon('error', 'Radio', 'Update Radio error');
            return {
                ...state,
            }
        default:
            return state
    }
}