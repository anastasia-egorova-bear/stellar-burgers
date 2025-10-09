import { combineSlices } from "@reduxjs/toolkit";
import ingredientsSlice from "./slice/ingredientsSlice";
import burgerConstructorSlice from "./slice/burgerConstructorSlice";
import userSlice from "./slice/userSlice";
import orderSlice from "./slice/orderSlice";
import feedSlice from "./slice/feedSlice";

const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  user: userSlice,
  order: orderSlice,
  feed: feedSlice
})

export default rootReducer;
