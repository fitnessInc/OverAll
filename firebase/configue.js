// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import { getAuth,getReactNativePersistence,initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOJiVXsQA3-nqgFToxXL65EvPBfLrV20g",
  authDomain: "sporty-6fdac.firebaseapp.com",
  projectId: "sporty-6fdac",
  storageBucket: "sporty-6fdac.appspot.com",
  messagingSenderId: "199287062968",
  appId: "1:199287062968:web:42489e762dfa93975e4f4d",
  measurementId: "G-XQV48Q7LBF"
}
  

// Initialize Firebase
const app = getApps().length ? getApp():initializeApp(firebaseConfig);
export const storage = getStorage(app);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}
export { auth };
