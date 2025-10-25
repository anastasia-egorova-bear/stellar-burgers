import orderReducer, {
  createOrder,
  fetchOrderByNumber,
  updateOrderRequest,
} from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '123',
  ingredients: ['ing1', 'ing2'],
  status: 'done',
  name: 'Бургер',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345
};

describe('orderSlice reducer', () => {
  const initialState = {
    orderData: null,
    orderRequest: false,
    loading: false,
    error: null
  };

  it('should handle updateOrderRequest', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      orderData: mockOrder
    };
    const newState = orderReducer(state, updateOrderRequest());
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderData).toBeNull();
  });

  describe('createOrder', () => {
    it('should set orderRequest to true on pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set orderData and reset orderRequest on fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      expect(state.orderData).toEqual(mockOrder);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set error and reset orderRequest on rejected', () => {
      const errorMessage = 'Ошибка создания заказа';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.loading).toBe(false);
    });
  });

  describe('fetchOrderByNumber', () => {
    it('should set loading to true on pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set orderData and reset loading on fulfilled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      expect(state.orderData).toEqual(mockOrder);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set error and reset loading on rejected', () => {
      const errorMessage = 'Заказ не найден';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
