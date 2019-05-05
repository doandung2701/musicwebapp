import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { authenticateReducer } from "./authenticationReducer";
import { songReducer } from "./songReducer";
import { artistReducer } from "./artistReducer";
import { searchReducer } from "./searchReducer";
import { commentsReducer } from "./CommentReducer";
import { albumsReducer } from "./albumsReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    authentication:authenticateReducer,
    songs: songReducer,
    artists: artistReducer,
    search: searchReducer,
    comments: commentsReducer,
    albums: albumsReducer
})

export default rootReducer;