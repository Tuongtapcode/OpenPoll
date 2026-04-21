import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IUser, ILoginPayload, IRegisterPayload } from '../types';

const initialState: IAuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('openpoll_token') : null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login
    loginTrigger(state, _action: PayloadAction<ILoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: IUser; token: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Register
    registerTrigger(state, _action: PayloadAction<IRegisterPayload>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<{ user: IUser; token: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Get me
    getMeTrigger(state) {
      state.loading = true;
    },
    getMeSuccess(state, action: PayloadAction<IUser>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    getMeFailure(state) {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    // Logout
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('openpoll_token');
      }
    },

    // Clear error
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  loginTrigger,
  loginSuccess,
  loginFailure,
  registerTrigger,
  registerSuccess,
  registerFailure,
  getMeTrigger,
  getMeSuccess,
  getMeFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
