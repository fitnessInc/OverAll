import {configureStore} from '@reduxjs/toolkit';
import  imagereducer  from './slices/imageSlice';
import infoReducer   from "./slices/infoSlice";
import metaReducer from "./slices/videoSlice"
import selectedProfileReducer from './slices/selectedSlice'




  const store = configureStore({
    reducer:{
        image:imagereducer,
        info: infoReducer,
        meta:metaReducer,
        proSelected:selectedProfileReducer,
    }

      

 });
  export default store;