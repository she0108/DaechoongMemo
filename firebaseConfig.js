// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSSJZnKcp626LYZ0QP2HiahtvqQcbq_dM",
  authDomain: "daechoongmemo.firebaseapp.com",
  projectId: "daechoongmemo",
  storageBucket: "daechoongmemo.appspot.com",
  messagingSenderId: "646222200830",
  appId: "1:646222200830:web:de8e8410dfd39a35f8caaf",
  measurementId: "G-6YT8NB56VE",
  databaseURL: "https://daechoongmemo-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getDatabase(app);