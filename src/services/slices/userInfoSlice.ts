import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TAuthState = {
  user: TUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: undefined
};

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (credentials: TLoginData) => {
    const response = await loginUserApi(credentials);
    const { refreshToken, accessToken, user } = response;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const logoutUserThunk = createAsyncThunk('auth/logout', async () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const registerUserThunk = createAsyncThunk(
  'users/register',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi({ email, name, password });
      const { refreshToken, accessToken, user } = response;
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);

export const getUserThunk = createAsyncThunk('users/getUser', getUserApi);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  updateUserApi
);

export const getOrdersThunk = createAsyncThunk(
  'users/getUserOrders',
  getOrdersApi
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});

export const userSelectors = authSlice.selectors;
export const userAction = authSlice.actions;
export default authSlice;
