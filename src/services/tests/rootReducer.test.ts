import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rootReducer from '../rootReducer';
import burgerConstructorSlice from '../slices/burgerConstructorSlice';
import ingredientsSlice from '../slices/ingredientsSlice';
import orderSlice from '../slices/orderSlice';
import authSlice from '../slices/userInfoSlice';
import feedsSlice from '../slices/feedSlice';

describe('rootReducer', () => {
  it('Тестирование корневого редьюсера', () => {
    const rootReducer = combineReducers({
      [ingredientsSlice.name]: ingredientsSlice.reducer,
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
      [orderSlice.name]: orderSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [feedsSlice.name]: feedsSlice.reducer
    });
  });
  const store = configureStore({
    reducer: rootReducer
  });
  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
  );
});
