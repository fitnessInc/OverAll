import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: {}
  
   
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setProfileMeta: (state, action) => {
      const { id, newImage } = action.payload;
      state.profiles[id] = newImage;
      console.log('setProfileMeta',{id,newImage})
    },
    clearProfileMeta: (state, action) => {
      const { id } = action.payload;
      delete state.profiles[id];
    },
  },
});

export const { setProfileMeta, clearProfileMeta } = imageSlice.actions;
export default imageSlice.reducer;