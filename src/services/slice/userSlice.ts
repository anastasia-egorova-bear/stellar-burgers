import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

interface TUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  userOrders: TOrder[];
  isAuthenticated: boolean;
  isModalOpen: boolean;
  loading: boolean;
  errorMessage: string;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  userOrders: [],
  isAuthenticated: false,
  isModalOpen: false,
  loading: false,
  errorMessage: ''
};

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith('rejected');
}

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      throw new Error('Ошибка при вводе логина');
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  } catch (error) {
    throw new Error('Ошибка при вводе логина');
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => {
          dispatch(setUser(user.user));
          dispatch(setIsAuthenticated(true));
        })
        .catch(() => {
          deleteCookie('accessToken');
          dispatch(setIsAuthenticated(false));
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
      dispatch(setIsAuthenticated(false));
    }
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const fetchUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectErrorMessage: (state) => state.errorMessage,
    selectUserOrders: (state) => state.userOrders,
    selectisModalOpen: (state) => state.isModalOpen,
    selectloading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
        state.isAuthenticated = false;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        state.isAuthenticated = true;
        state.errorMessage = '';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addMatcher(isRejectedAction, (state, action: RejectedAction) => {
        // Очищаем токены при любой ошибке
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');

        // Устанавливаем флаг аутентификации в false
        state.isAuthenticated = false;

        // Сохраняем сообщение об ошибке
        state.errorMessage =
          action.error.message || 'Произошла ошибка при выполнении запроса';

        // Если была попытка авторизации, сбрасываем состояние
        if (action.type.includes('login/rejected')) {
          state.isAuthChecked = true;
          state.user = null;
        }

        // Общий сброс состояния при ошибке
        state.loading = false;
      });
  }
});

export const { setUser, setIsAuthChecked, setIsAuthenticated } =
  userSlice.actions;
export const {
  selectUser,
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectErrorMessage,
  selectUserOrders,
  selectisModalOpen,
  selectloading
} = userSlice.selectors;

export default userSlice.reducer;
