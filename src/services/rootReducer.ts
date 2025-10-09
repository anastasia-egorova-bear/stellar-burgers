import { combineSlices } from "@reduxjs/toolkit";
import ingredientsSlice from "./slice/ingredientsSlice";
import burgerConstructorSlice from "./slice/burgerConstructorSlice";
import userSlice from "./slice/userSlice";

const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  user: userSlice
})

export default rootReducer;
