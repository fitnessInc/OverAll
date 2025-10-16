 import { createSlice } from '@reduxjs/toolkit';

const initialState={
   metaPro:{}
};

 const  metaSlice=createSlice({
    name:'meta',
    initialState,
    reducers:{
        metaProfile:(state,action)=>{
            const {id,newMeta}= action.payload;
            state.metaPro[id] = newMeta
        }
    }

    
 })

 export const {metaProfile}= metaSlice.actions;
 export default metaSlice.reducer