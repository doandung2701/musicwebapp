import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './app/rootReducer';
import thunk from 'redux-thunk';
import AppContainer from './app/AppContainer';
import { loadQueueState, loadUserData } from './localStorage';

const queueFromLocalStorage = loadQueueState();
const persistedData = {
  queueState: queueFromLocalStorage,
  auth: {
    authenticated: Boolean(loadUserData()),
    user: loadUserData(),
    errors: {},
  },
};
var store = createStore(rootReducer,persistedData,compose(applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


ReactDOM.render(
<Provider store ={store}>
<AppContainer /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
