import {combineReducers} from 'redux';
import { appReducer } from './authenticationReducer';

export const rootReducer = combineReducers({
    authentication: appReducer
});