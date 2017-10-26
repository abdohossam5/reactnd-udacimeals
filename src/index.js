import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducers';
import {Provider} from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => next => action => {
    console.group('Logger');
    console.log('dispatching => ', action);
    let result = next(action);
    console.log('state => ', store.getState());
    console.groupEnd('Logger');
    return result;
};

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(logger))
);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
