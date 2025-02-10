// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxdbABweh04CDIK2O9_giXPUSstZtiixc",
  authDomain: "mankind-6205a.firebaseapp.com",
  projectId: "mankind-6205a",
  storageBucket: "mankind-6205a.firebasestorage.app",
  messagingSenderId: "16916488167",
  appId: "1:16916488167:web:e5bd4466c62eb55c996742",
  measurementId: "G-HF3KWQX4F0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);