import { ingredientsSlice, fetchIngredients, initialState } from './ingredientsSlice';
import { TIngredient } from '@utils-types';


// Пример данных ингредиентов
const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 20,
    calories: 420,
    price: 1255,
    image: 'image.jpg',
    image_mobile: 'image_mobile.jpg',
    image_large: 'image_large.jpg',
  }
];

describe('ingredientsSlice reducer', () => {
  it('should handle pending action', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fulfilled action with ingredients', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('should handle rejected action with error message', () => {
    const errorMessage = 'Ошибка при получении ингредиентов';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle rejected action without error message', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: {}
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Произошла ошибка');
  });
});
