import {configureStore} from '@reduxjs/toolkit';
import  imagereducer  from './slices/imageSlice';




  const store = configureStore({
    reducer:{
        image:imagereducer
    }

      

 });
  export default store;