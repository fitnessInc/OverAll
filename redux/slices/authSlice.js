import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  indicator: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      state.indicator = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.indicator = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;