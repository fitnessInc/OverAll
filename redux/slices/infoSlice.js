


 import { createSlice } from '@reduxjs/toolkit';

const initialState={
    infoPro:{
        'user1':{
            'Full_Name':'nanito Ahmat',
            'Address':'test',
            'Function':'trainer'
        },
        'user2':{
            'Full_Name':'Aicha Ahmat',
            'Address':'test',
            'Function':'client'
        },
        'user3':{
            'Full_Name':'lilAms',
            'Address':'test',
            'Function':'client'
        },
         'user4':{
            'Full_Name':'test',
            'Address':'test',
            'Function':'client'
        },
    },
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