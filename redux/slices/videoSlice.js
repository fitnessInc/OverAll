
import { createSlice } from '@reduxjs/toolkit';
import {Asset } from 'expo-asset';
const videoAsset = Asset.fromModule(require('../../assets/videos/nutrution.mp4'))

const initialState = {
  metaPro: {
    'user1': '../../assets/videos/nutrution.mp4',
    'user2': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'user3': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'user4': 'https://randomuser.me/api/portraits/men/1.jpg',
  }
};

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    metaProfile: (state, action) => {
      const { id, newMeta } = action.payload;
      state.metaPro[id] = newMeta;
    }
  }
});

export const { metaProfile } = metaSlice.actions;
export default metaSlice.reducer;