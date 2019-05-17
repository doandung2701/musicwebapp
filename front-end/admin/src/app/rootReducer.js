import { combineReducers } from "redux";
import { authenReducer } from "../user/reducer/authenReducer";
import { singerListReducer, singerReducer, SingerModalReducer } from "../singer/SingerReducer";
import { ScoretypeListReducer, scoretypeReducer, ScoreTypeModalReducer } from "../scoretype/ScoreTypeReducer";
import { commentListReducer} from "../comments/CommentsReducer";
import { userListReducer } from "../users/UsersReducer";
import { playListListReducer, playListModalReducer} from '../playlist/PlayListReducer';
import { albumsListReducer, AlbumModalReducer } from "../album/AlbumReducer";
import { songListReducer, songModalReducer} from '../song/SongsReducer';
import { authorListReducer, authorModalReducer } from '../author/AuthorsReducer';
import { categoryListReducer, categoryModalReducer } from '../category/CategoryReducer';
import { radioListReducer, radioModalReducer } from '../radio/RadiosReducer';
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
    albumList:albumsListReducer,
    albumModal:AlbumModalReducer,
    songList: songListReducer,
    songModal: songModalReducer,
    // songReducer: songListReducer,
    authorList: authorListReducer,
    authorModal: authorModalReducer,
    categoryList: categoryListReducer,
    categoryModal: categoryModalReducer,
    radioList: radioListReducer,
    radioModal: radioModalReducer 
})