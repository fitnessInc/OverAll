import {configureStore} from '@reduxjs/toolkit';
import  imagereducer  from './slices/imageSlice';
import infoReducer   from "./slices/infoSlice";
import metaReducer from "./slices/videoSlice"




  const store = configureStore({
    reducer:{
        image:imagereducer,
        info: infoReducer,
        meta:metaReducer
    }

      

 });
  export default store;