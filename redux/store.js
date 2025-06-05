import {configureStore} from '@reduxjs/toolkit';
import  imagereducer  from './slices/imageSlice';
import infoReducer   from "./slices/infoSlice"




  const store = configureStore({
    reducer:{
        image:imagereducer,
        info: infoReducer,
    }

      

 });
  export default store;