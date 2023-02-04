// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Dev/prod
// const firebaseConfig = {
//   apiKey: "AIzaSyDIptDPFeiN2j_ugEiTnB_vMx9FS9FhPSw",
//   authDomain: "react-curso-b129d.firebaseapp.com",
//   projectId: "react-curso-b129d",
//   storageBucket: "react-curso-b129d.appspot.com",
//   messagingSenderId: "1001730891869",
//   appId: "1:1001730891869:web:eac69c12b72a76d5662db4",
// };

// Testing
const firebaseConfig = {
  apiKey: "AIzaSyAnzmLezFXaTnEfTo40caBl3Kfegaq626M",
  authDomain: "testing-c74fe.firebaseapp.com",
  projectId: "testing-c74fe",
  storageBucket: "testing-c74fe.appspot.com",
  messagingSenderId: "895204257900",
  appId: "1:895204257900:web:f474822e60c6bfc23f2849",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Auth
export const FirebaseAuth = getAuth(FirebaseApp);

// Database
export const FirebaseDB = getFirestore(FirebaseApp);
