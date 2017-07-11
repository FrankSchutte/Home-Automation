import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middleware = applyMiddleware(thunk);

let store;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(
        reducers,
        compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__())
    );
} else {
    store = createStore(
        reducers,
        middleware
    );
    console.log('No redux devtools found');
}

export default store;
