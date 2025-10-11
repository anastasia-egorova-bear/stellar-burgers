import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitState = {
  orderData: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
};

const initialState: TInitState = {
  orderData: null,
  orderRequest: false,
  loading: false
};

export const createOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchByNumber',
  async (number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      const order = res.orders?.[0] as TOrder | undefined;
      if (!order) throw new Error('Order not found');
      return order;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed get order';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProfileOrders = createAsyncThunk<TOrder[]>(
  'profileOrders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch profile orders';
      return rejectWithValue(errorMessage);
    }
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
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderLoading: (state) => state.loading
  }
});

export const { selectOrderData, selectOrderRequest, selectOrderLoading } = orderSlice.selectors;
export const { updateOrderRequest } = orderSlice.actions;
export default orderSlice.reducer;

