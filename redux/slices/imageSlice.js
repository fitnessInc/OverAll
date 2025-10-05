import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: {} // Store images by profile ID
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setProfileMeta: (state, action) => {
      const { id, meta } = action.payload;
      state.profiles[id] = meta;
    },
    clearProfileMeta: (state, action) => {
      const { id } = action.payload;
      delete state.profiles[id];
    },
  },
});

export const { setProfileMeta, clearProfileMeta } = imageSlice.actions;
export default imageSlice.reducer;