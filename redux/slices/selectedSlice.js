 import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
   selectedProfile:{}
     
   
 };

  const selectedProfileSlice = createSlice({
     name:'proSelected',
     initialState,
           reducers:{
          setSelectedProfile:(state,action)=>{

                 const {id,selectedPro}= action.payload;
                 state.selectedProfile[id]=selectedPro

             },

             clearSelectedProfile: (state,action)=>{

               const {id}=action.payload;
               delete state.selectedProfile[id]

            }


      }
  })

  export const {setSelectedProfile, clearSelectedProfile}= selectedProfileSlice.actions;
    export default selectedProfileSlice.reducer