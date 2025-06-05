
import { createSelector } from '@reduxjs/toolkit'

const selInfoData = state=> state.info.infoPro; 



 export  const selectPro = createSelector(
    [selInfoData],
    (infoPro)=>  Object.entries(infoPro).map(([id,value])=>({
        id,
        ...value
    }))

 );