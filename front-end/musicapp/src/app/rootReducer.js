import {combineReducers} from 'redux';
import { appReducer } from './AppReducer';

export const rootReducer = combineReducers({
    authentication: appReducer
});