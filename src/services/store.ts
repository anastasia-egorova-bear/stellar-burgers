import { combineReducers, combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import rootReducer from './rootReducer';

// const rootReducer = combineReducers({
//   // ingredients: ingredientsSlice,
//   // burgerConstuctor: burgerConstuctorSlice,
//   // order: orderSlice,
//   // feed: feedSlice,
//   user: userSlice
// });

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
