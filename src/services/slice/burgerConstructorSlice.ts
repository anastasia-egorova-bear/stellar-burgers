// Импортируем необходимые компоненты
// import { getIngredientsApi } from '@api';
// import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// // import { RootState } from  // путь к вашему файлу store
// // import { TIngredient } from './/utils/types'; // путь к вашим типам
// // import { getIngredientsApi } from '..//utils/burger-api'; // путь к вашему api файлу
// // import type { RootState } from '../store';

// import { createAsyncThunk } from "@reduxjs/toolkit";

// // Определяем тип для payload
// export interface IngredientsPayload {
//   ingredients: TIngredient[];
// }

// // Создаем asyncThunk
// export const fetchIngredients = createAsyncThunk(
//   'ingredients/fetchIngredients',
//   async () => {
//     try {
//       // Вызываем API функцию
//       const response = await getIngredientsApi();
//       return response;
//     } catch (error) {
//       throw new Error('Ошибка при получении ингредиентов');
//     }
//   }
// );

// // Пример использования в slice
// import { createSlice } from '@reduxjs/toolkit';
// import { TIngredient } from '@utils-types';
// import { RootState } from '../store';

// export const burgerConstructorSlice = createSlice({
//   name: 'ingredients',
//   initialState: {
//     ingredients: [] as TIngredient[],
//     status: 'idle' as 'idle' | 'loading' | 'failed',
//     error: null as string | null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
//         state.status = 'idle';
//         state.ingredients = action.payload;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.status = 'failed';
//         // state.error = action.error?.message;
//       });
//   },
// });

// Экспортируем reducer
// export const { actions, reducer: ingredientsReducer } = burgerConstructorSlice;


// export const { setBun, addItem, removeItem, reorderItems, reset } =
//   burgerConstructorSlice.actions;
// export default burgerConstructorSlice.reducer;

// export const selectConstructor = (state: RootState) => state.burgerConstructor;
// export const selectConstructorBun = (state: RootState) =>
//   state.burgerConstructor.bun;
// export const selectConstructorItems = (state: RootState) =>
//   state.burgerConstructor.items;




