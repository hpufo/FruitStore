import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import allReducers from './reducers';

const middleware = applyMiddleware(thunk/*,logger()*/);

export default createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);