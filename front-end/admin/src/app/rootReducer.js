import { combineReducers } from "redux";
import { authenReducer } from "../user/reducer/authenReducer";
export const rootReducer=combineReducers({
    authenReducer:authenReducer,
   
})