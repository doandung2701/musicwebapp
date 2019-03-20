import { combineReducers } from "redux";
import { authenReducer } from "../user/reducer/authenReducer";
import { singerListReducer, singerReducer } from "../singer/SingerReducer";
export const rootReducer=combineReducers({
    authenReducer:authenReducer,
    singerList: singerListReducer,
    singer: singerReducer
})