// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '../../utils/burger-api';
// import { TIngredient } from '../../utils/types';
// import { RootState } from '../store';

// type IngredientsState = {
//   list: TIngredient[];
//   isLoading: boolean;
//   error: string | null;
// };

// const initialState: IngredientsState = {
//   list: [],
//   isLoading: false,
//   error: null
// };

// export const fetchIngredients = createAsyncThunk<TIngredient[]>(
//   'ingredients/fetchIngredients',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getIngredientsApi();
//       return response;
//     } catch (error: unknown) {
//       const errorMessage =
//         error instanceof Error ? error.message : 'Failed to fetch ingredients';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

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

// const ingredientsSlice = createSlice({
//   name: 'ingredients',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error =
//           (action.payload as string) ?? 'Failed to fetch ingredients';
//       });
//   }
// });

// export const selectIngredients = (state: RootState) => state.ingredients.list;
// export const selectIngredientsIsLoading = (state: RootState) =>
//   state.ingredients.isLoading;
// export const selectIngredientsError = (state: RootState) =>
//   state.ingredients.error;

// export default ingredientsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TInitState {
  ingredients: TIngredient[];
  loading: boolean;
  isModalOpened: boolean;
  errorText: string;
}

const initialState: TInitState = {
  ingredients: [],
  loading: false,
  isModalOpened: false,
  errorText: ''
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpened = true;
    },
    closeModal(state) {
      state.isModalOpened = false;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectIsModalOpened: (state) => state.isModalOpened,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.errorText = action.error.message!;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
  }
});
export const { openModal, closeModal } = ingredientsSlice.actions;

export const {
  selectLoading,
  selectIngredients,
  selectIsModalOpened,
  selectErrorText
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;

function getIngredientsApi(): any {
  throw new Error('Function not implemented.');
}

