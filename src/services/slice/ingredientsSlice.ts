import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    try {
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
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectIngredientsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
      });
  }
});

export const { selectLoading, selectIngredients, selectIngredientsError } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
