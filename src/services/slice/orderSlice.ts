import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitState = {
  orderData: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TInitState = {
  orderData: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'orders/newOrder',
  async (ingredientIds) => {
    const res = await orderBurgerApi(ingredientIds);
    return res.order as TOrder;
  }
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchByNumber',
  async (number) => {
    const response = await getOrderByNumberApi(number);
    const order = response.orders?.[0] as TOrder | undefined;
    if (!order) throw new Error('Заказ не найден');
    return order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrderRequest(state) {
      state.orderRequest = false;
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;

        state.orderRequest = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderRequest = false;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderLoading: (state) => state.loading,
    selectError: (state) => state.error
  }
});

export const {
  selectOrderData,
  selectOrderRequest,
  selectOrderLoading,
  selectError
} = orderSlice.selectors;
export const { updateOrderRequest } = orderSlice.actions;
export default orderSlice.reducer;
