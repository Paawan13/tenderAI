// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZKAf7Zx0VY6Kue_sVAdWSaNQqr9lXdtk",
  authDomain: "ak-c2bdf.firebaseapp.com",
  projectId: "ak-c2bdf",
  storageBucket: "ak-c2bdf.appspot.com",
  messagingSenderId: "738164863965",
  appId: "1:738164863965:web:b6ab0653836a42099d3c34",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
