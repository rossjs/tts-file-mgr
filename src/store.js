import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

// use Redux DevTools compose if present
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();

// create Redux store and apply middleware
const storeArgs = [reducers, composeEnhancers(applyMiddleware(sagaMiddleware))];

const store = createStore(...storeArgs);

// make sagas available to Redux Saga middleware
sagaMiddleware.run(rootSaga);

export default store;
