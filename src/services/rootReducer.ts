import { combineSlices } from "@reduxjs/toolkit";
// // import ingredientsSlice from "./slice/ingredientsSlice";
import { userSlice } from "./slice/userSlice";
// // import { burgerConstructorSlice } from "./slice/burgerConstructorSlice";

// // const rootReducer = combineReducers(
// // //для массива ингридиентов
// // //для данных конструктора (правая ч гл стр)
// // //для созданного заказа
// // //хранит данные пользова(работает с защищёнными маршрутами)
// // //
// // //  burgerConstructorSlice
// // ingredientsSlice
// // );

// // export default rootReducer;


const rootReducer = combineSlices(userSlice
);

export default rootReducer;
