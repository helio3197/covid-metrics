import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import homeReducer from './home/home';
import filterReducer from './filter/filter';
import pathReducer from './path/path';

const rootReducer = combineReducers({
  home: homeReducer,
  filter: filterReducer,
  path: pathReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
