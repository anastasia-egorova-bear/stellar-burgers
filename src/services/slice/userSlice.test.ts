import { userSlice } from './userSlice'; // путь к твоему файлу
import { TUser, TOrder } from '@utils-types';

const { reducer, actions } = userSlice;

describe('userSlice reducer', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    userOrders: [],
    loading: false,
    error: null
  };

  it('should handle pending action (e.g., login.pending)', () => {
    const action = { type: 'user/login/pending' };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fulfilled action (e.g., login.fulfilled)', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };
    const action = {
      type: 'user/login/fulfilled',
      payload: { user: mockUser }
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle rejected action (e.g., login.rejected)', () => {
    const action = {
      type: 'user/login/rejected',
      error: { message: 'Ошибка при вводе логина' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка при вводе логина');
  });

  it('should handle logout.fulfilled', () => {
    const prevState = {
      ...initialState,
      user: { name: 'John', email: 'john@example.com' },
      loading: true
    };
    const action = { type: 'user/logout/fulfilled' };
    const state = reducer(prevState, action);
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('should handle fetchUpdateUser.fulfilled', () => {
    const mockUser: TUser = { email: 'updated@example.com', name: 'Updated' };
    const action = {
      type: 'user/update/fulfilled',
      payload: { user: mockUser }
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-10-24T10:00:00.000Z',
    updatedAt: '2025-10-24T10:00:05.000Z',
    number: 12345
  }
];
    const action = {
      type: 'user/orders/fulfilled',
      payload: mockOrders
    };
    const state = reducer(initialState, action);
    expect(state.userOrders).toEqual(mockOrders);
    expect(state.loading).toBe(false);
  });

  it('should handle fetchRegisterUser.fulfilled', () => {
    const action = { type: 'user/register/fulfilled' };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle fetchRegisterUser.rejected', () => {
    const action = {
      type: 'user/register/rejected',
      error: { message: 'Registration failed' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Registration failed');
  });
});
