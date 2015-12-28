import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { Provider } from 'react-redux'

import scribeApp from './reducers'

import App from './app';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
    // , loggerMiddleware
)(createStore);

let store = createStoreWithMiddleware(scribeApp);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-container')
);


