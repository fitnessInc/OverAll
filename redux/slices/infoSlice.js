


 import { createSlice } from '@reduxjs/toolkit';

const initialState={
    infoPro:{},
};


const infoSlices = createSlice({
    name:"info",
    initialState,
    reducers:{

        updateInfoPro(state,action){
            const {id,newData}=action.payload;
            state.infoPro = {
                ...state.infoPro,
                [id]:{
                    ...state.infoPro[id],
                    ...newData

                }
                
              };
            

        }

    },
   
    
});


export const{ updateInfoPro}= infoSlices.actions;
export default  infoSlices.reducer