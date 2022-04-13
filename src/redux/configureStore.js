import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import homeReducer from './home/home';
import filterReduxer from './filter/filter';

const rootReducer = combineReducers({
  home: homeReducer,
  filter: filterReduxer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
