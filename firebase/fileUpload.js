
import{ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {storage} from './configue'

const fileUpload = async (uri)=>{
    try{
         // fetching the uri from the locale divice or downloading the file 
          const  mediaDownload=  await fetch(uri);
          // reading mediaDownload as binary large object bolb
          const  bolb = await mediaDownload.bolb();
    }

}