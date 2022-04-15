import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import homeReducer from './home/home';
import filterReducer from './filter/filter';
import pathReducer from './path/path';
import shapesReducer from './countries-shapes/countriesShapes';

const rootReducer = combineReducers({
  home: homeReducer,
  filter: filterReducer,
  path: pathReducer,
  shapes: shapesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
