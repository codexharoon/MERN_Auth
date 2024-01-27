// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-622b4.firebaseapp.com",
  projectId: "mern-auth-622b4",
  storageBucket: "mern-auth-622b4.appspot.com",
  messagingSenderId: "1058675728142",
  appId: "1:1058675728142:web:2d49285b76f58895ad415f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
