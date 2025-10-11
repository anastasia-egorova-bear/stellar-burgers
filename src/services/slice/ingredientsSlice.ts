import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
}

const initialState: TIngredientState = {
  ingredients: [],
  loading: false
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
    selectLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectLoading, selectIngredients } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
