import { createSlice } from '@reduxjs/toolkit';

const initialState={
    profile:null,
};


const imageSlices = createSlice({
    name:"image",
    initialState,
    reducers:{
        setProfileMeta(state,action){
            state.profile = action.payload;
        }

    },
    //  clearProfileMeta(state){
       
    //     state.profile=null;
    //  }
});


export const{ setProfileMeta}= imageSlices.actions;
export default  imageSlices.reducer