import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '../../utils/types';
import { createOrder } from './orderSlice';

export type ConstructorState = {
  bun: TIngredient | null;
  items: TConstructorIngredient[];
};

export const initialState: ConstructorState = {
  bun: null,
  items: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addItem(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      if (!state.items) {
        state.items = [];
        return;
      }
      state.items.splice(action.payload, 1);
    },
    reorderItems(state, action: PayloadAction<{ from: number; to: number }>) {
      if (!state.items) {
        state.items = [];
        return;
      }
      const { from, to } = action.payload;
      const [moved] = state.items.splice(from, 1);
      state.items.splice(to, 0, moved);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.bun = null;
      state.items = [];
    });
  },
  selectors: {
    selectConstructor: (state) => state.bun,
    selectConstructorItems: (state) => state.items
  }
});

export const { selectConstructor, selectConstructorItems } =
  burgerConstructorSlice.selectors;
export const { setBun, addItem, removeItem, reorderItems } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
