import { combineSlices } from "@reduxjs/toolkit";
import ingredientsSlice from "./slice/ingredientsSlice";
import burgerConstructorSlice from "./slice/burgerConstructorSlice";

const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice})

export default rootReducer;
