// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAaI3NbfzLn3Mn1nIxha8upvVebu8Z7POk",
    authDomain: "ai-reel-generator-10857.firebaseapp.com",
    projectId: "ai-reel-generator-10857",
    storageBucket: "ai-reel-generator-10857.appspot.com", // ✅ Corrected
    messagingSenderId: "950554626934",
    appId: "1:950554626934:web:45235f91e92b3118bc0857",
    measurementId: "G-XKVBD8TV2N"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);