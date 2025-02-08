import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import orderSlice from './slices/orderSlice';
import authSlice from './slices/userInfoSlice';
import feedsSlice from './slices/feedSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer
});

export default rootReducer;
