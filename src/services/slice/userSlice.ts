import { getUserApi, loginUserApi, logoutApi, TLoginData } from "@api";
import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser, TOrder } from "@utils-types";
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie'


type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  userOrders: TOrder[];
  isAuthenticated: boolean;
  isModalOpen: boolean;
  loading: boolean;
  errorMessage: string;
};

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
  error: Error
}

function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith('rejected')
};

// const setUser = createAction<TUser | null, 'user/setUser'>('user/setUser')
// const saveTokens = (accessToken: string, refreshToken: string) => {
//   setCookie('accessToken', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);
// };

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

  //   'user/login',
  // async (data: TLoginData) => {
  //   const response = await loginUserApi(data);
  //   saveTokens(response.accessToken, response.refreshToken);
  //   return response;
  // }
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return null; 
    } catch (error) {
      throw new Error('Ошибка при вводе логина');
    }
  }
);

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // state.user = action.payload;
      state.isAuthChecked = true;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
.addMatcher(
  isRejectedAction,
  (state, action: RejectedAction) => {
    // Очищаем токены при любой ошибке
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Устанавливаем флаг аутентификации в false
    state.isAuthenticated = false;
    
    // Сохраняем сообщение об ошибке
    state.errorMessage = action.error.message || 'Произошла ошибка при выполнении запроса';
    
    // Если была попытка авторизации, сбрасываем состояние
    if (action.type.includes('login/rejected')) {
      state.isAuthChecked = true;
      state.user = null;
    }
    
    // Общий сброс состояния при ошибке
    state.loading = false;
  }
)
  },
});

export const { setUser, setIsAuthChecked, setIsAuthenticated } = userSlice.actions;
export const { selectUser, selectIsAuthChecked, selectIsAuthenticated, selectErrorMessage } = userSlice.selectors;


