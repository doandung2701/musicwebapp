import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { authenticateReducer } from "./authenticationReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    authentication:authenticateReducer
})

export default rootReducer;