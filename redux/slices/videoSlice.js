 import { createSlice } from '@reduxjs/toolkit';

const initialState={
    videoPro:{},
};

 const  videoSlice=createSlice({
    name:video,
    initialState,
    reducers:{
        videoProfile:(state,action)=>{
            const {id,meta}= action.payload;
            state.videoPro = meta 
        }
    }

    
 })

 export const {videoProfile}= videoSlice.actions;
 export default videoSlice.reducer