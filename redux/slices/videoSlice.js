
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metaPro: {
    'user1': 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    'user2': 'https://randomuser.me/api/portraits/women/2.jpg',
    'user3': 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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