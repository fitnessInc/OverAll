import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: {
     'user1': "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    'user2':  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    'user3':  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    'user4':  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
  }, // Store images by profile ID
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