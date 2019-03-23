import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import AppContainer from './app/AppContainer';
import { createStore,compose,applyMiddleware } from "redux";
import { rootReducer } from './app/rootReducer';
import { Provider } from "react-redux";
<<<<<<< HEAD
import { DraggableModalProvider } from 'ant-design-draggable-modal';
=======
import SingerListContainer from './singer/SingerListContainer';
>>>>>>> f74ba929ce067c351edf2b30cdba4aa325b1e185

const store=createStore(rootReducer,compose(applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
ReactDOM.render( <Provider store={store}>
    <SingerListContainer />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
