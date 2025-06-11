
import { createSelector } from '@reduxjs/toolkit'
import { object } from 'yup';

const selInfoData = state=> state.info.infoPro; 



 export  const selectPro = createSelector(
    [selInfoData],

    (infoPro)=>{
        return Object.keys(infoPro).length===0
        ?[]:object.entries(infoPro).map(([id,value])=>({
            id,
            ...value

        }))
    }
    // (infoPro)=>  Object.entries(infoPro).map(([id,value])=>({
    //     id,
    //     ...value
    // }))


 );