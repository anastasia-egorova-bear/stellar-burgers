import feedReducer, {
  fetchFeeds,
  fetchProfileOrders,
  initialState
} from './feedSlice';

// Мокаем API-функции
jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

describe('feedSlice reducers', () => {
  const mockFeedData = {
    orders: [{ _id: '1', status: 'done' }],
    total: 100,
    totalToday: 10
  };

  const mockProfileOrders = [{ _id: '2', status: 'pending' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set isLoading to true on pending (fetchFeeds)', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set isLoading to true on pending (fetchProfileOrders)', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should store feed data and set isLoading to false on fulfilled (fetchFeeds)', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedData
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeedData.orders);
    expect(state.total).toBe(mockFeedData.total);
    expect(state.totalToday).toBe(mockFeedData.totalToday);
    expect(state.error).toBeNull();
  });

  it('should store profile orders and set isLoading to false on fulfilled (fetchProfileOrders)', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: mockProfileOrders
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockProfileOrders);
    expect(state.total).toBe(mockProfileOrders.length);
    expect(state.totalToday).toBe(mockProfileOrders.length);
    expect(state.error).toBeNull();
  });

  it('should set error and isLoading to false on rejected (fetchFeeds)', () => {
    const errorMessage = 'Network error';
    const action = {
      type: fetchFeeds.rejected.type,
      payload: errorMessage,
      error: { message: errorMessage }
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should set fallback error and isLoading to false on rejected (fetchProfileOrders)', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      error: { message: undefined }
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Произошла ошибка');
  });
});
