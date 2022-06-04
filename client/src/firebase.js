// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqLTS0saXwk0UMgcHFnkQDvljj3bBBG64",
  authDomain: "mercadont-libre.firebaseapp.com",
  projectId: "mercadont-libre",
  storageBucket: "mercadont-libre.appspot.com",
  messagingSenderId: "267726731273",
  appId: "1:267726731273:web:1c2150eb119c1fe9dba0d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
