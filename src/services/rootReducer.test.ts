import rootReducer from './rootReducer';
import ingredientsSlice from './slice/ingredientsSlice';
import burgerConstructorSlice from './slice/burgerConstructorSlice';
import userSlice from './slice/userSlice';
import orderSlice from './slice/orderSlice';
import feedSlice from './slice/feedSlice';

describe('rootReducer', () => {
  it('should return the initial state when called with undefined state and unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, unknownAction);

    const expectedState = {
      ingredients: ingredientsSlice(undefined, unknownAction),
      burgerConstructor: burgerConstructorSlice(undefined, unknownAction),
      user: userSlice(undefined, unknownAction),
      order: orderSlice(undefined, unknownAction),
      feed: feedSlice(undefined, unknownAction),
    };

    expect(initialState).toEqual(expectedState);
  });
});
