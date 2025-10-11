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
  loading: boolean;
  error: string | null;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  userOrders: [],
  loading: false,
  error: null
};

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
          dispatch(setIsAuthChecked(true));
        })
        .catch(() => {
          deleteCookie('accessToken');
          dispatch(setIsAuthChecked(false));
        });
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
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
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectErrorMessage: (state) => state.error,
    selectUserOrders: (state) => state.userOrders,
    selectloading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchRegisterUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
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
        state.error = action.error.message!;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const {
  selectUser,
  selectIsAuthChecked,
  selectErrorMessage,
  selectUserOrders,
  selectloading
} = userSlice.selectors;

export default userSlice.reducer;
