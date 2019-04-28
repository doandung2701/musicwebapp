import { combineReducers } from "redux";
import { authenReducer } from "../user/reducer/authenReducer";
import { singerListReducer, singerReducer, SingerModalReducer } from "../singer/SingerReducer";
import { ScoretypeListReducer, scoretypeReducer, ScoreTypeModalReducer } from "../scoretype/ScoreTypeReducer";
import { commentListReducer} from "../comments/CommentsReducer";
import { userListReducer } from "../users/UsersReducer";
import { playListListReducer, playListModalReducer} from '../playlist/PlayListReducer';
export const rootReducer=combineReducers({
    authenReducer:authenReducer,
    singerList: singerListReducer,
    singer: singerReducer,
    scoreTypeList:ScoretypeListReducer,
    singerModal:SingerModalReducer,
    scoreType:scoretypeReducer,
    scoreTypeModal:ScoreTypeModalReducer,
    commentReducer: commentListReducer,
    userReducer: userListReducer,
    playListList: playListListReducer,
    playListModal: playListModalReducer,
})