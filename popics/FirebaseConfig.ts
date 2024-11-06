// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuratio
const firebaseConfig = {
  apiKey: "AIzaSyCNw5jDOdiBAUOCU94K_WFkdZhGfmEkLdA",
  authDomain: "des427-popics-9dace.firebaseapp.com",
  projectId: "des427-popics-9dace",
  storageBucket: "des427-popics-9dace.firebasestorage.app",
  messagingSenderId: "1037295525432",
  appId: "1:1037295525432:web:daa7870edb27d0028590cd",
  measurementId: "G-12Y8LHBXXL"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);