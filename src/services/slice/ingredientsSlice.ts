import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  errorText: string;
}

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  errorText: ''
};

// export const fetchIngredients = createAsyncThunk(
//   'ingredients/getAll',
//   async () => getIngredientsApi()
// );

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    try {
      // Вызываем API функцию
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      throw new Error('Ошибка при получении ингредиентов');
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: { },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.errorText = action.error.message!;
    })
    .addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
  }
});

export const { selectLoading,selectIngredients,selectErrorText } = ingredientsSlice.selectors;
// export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
// export const selectLoading = (state: RootState) =>
//   state.ingredients.loading;
// export const selectErrorText = (state: RootState) =>
//   state.ingredients.errorText;



export default ingredientsSlice.reducer;


