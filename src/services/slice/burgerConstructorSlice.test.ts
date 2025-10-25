import { burgerConstructorSlice, ConstructorState } from './burgerConstructorSlice';
import type { TIngredient, TConstructorIngredient } from '../../utils/types';

const { reducer, actions } = burgerConstructorSlice;

const initialState: ConstructorState = {
  bun: null,
  items: []
};

describe('burgerConstructorSlice', () => {
  const mockBun: TIngredient = {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url',
  };

  const mockIngredient: TConstructorIngredient = {
    ...mockBun,
    id: 'ing-1',
    type: 'main'
  };

  const mockIngredient2: TConstructorIngredient = {
    ...mockBun,
    id: 'ing-2',
    type: 'sauce'
  };

  describe('addItem', () => {
    it('should add a bun to the bun field', () => {
      const bunIngredient: TConstructorIngredient = { ...mockBun, id: 'bun-id', type: 'bun' };
      const action = actions.addItem(bunIngredient);
      const newState = reducer(initialState, action);

      expect(newState.bun).toEqual(bunIngredient);
      expect(newState.items).toEqual([]);
    });

    it('should add a non-bun ingredient to items array', () => {
      const action = actions.addItem(mockIngredient);
      const newState = reducer(initialState, action);

      expect(newState.bun).toBeNull();
      expect(newState.items).toEqual([mockIngredient]);
    });
  });

  describe('removeItem', () => {
    it('should remove an item at the specified index', () => {
      const stateWithItems: ConstructorState = {
        bun: null,
        items: [mockIngredient, mockIngredient2]
      };
      const action = actions.removeItem(0);
      const newState = reducer(stateWithItems, action);

      expect(newState.items).toEqual([mockIngredient2]);
    });

    it('should not crash if items array is empty', () => {
      const action = actions.removeItem(0);
      const newState = reducer(initialState, action);

      expect(newState.items).toEqual([]);
    });
  });

  describe('reorderItems', () => {
    it('should reorder items correctly', () => {
      const stateWithItems: ConstructorState = {
        bun: null,
        items: [mockIngredient, mockIngredient2]
      };
      const action = actions.reorderItems({ from: 0, to: 1 });
      const newState = reducer(stateWithItems, action);

      expect(newState.items).toEqual([mockIngredient2, mockIngredient]);
    });

    it('should handle reorder when items array is empty', () => {
      const action = actions.reorderItems({ from: 0, to: 0 });
      const newState = reducer(initialState, action);

      expect(newState.items).toEqual([]);
    });
  });
});
