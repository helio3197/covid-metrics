import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import homeReducers from './home/home';

const rootReducer = combineReducers({
  home: homeReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
