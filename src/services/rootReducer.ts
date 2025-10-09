import { combineSlices } from "@reduxjs/toolkit";
import ingredientsSlice from "./slice/ingredientsSlice";
import burgerConstructorSlice from "./slice/burgerConstructorSlice";
import userSlice from "./slice/userSlice";
import orderSlice from "./slice/orderSlice";

const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  user: userSlice,
  order: orderSlice,
})

export default rootReducer;
