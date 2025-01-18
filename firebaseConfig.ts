import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/functions";
import { getStorage, ref } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMPWy2WRs4Fnojd0hlcJ0oBqyBHCFvZM0",
  authDomain: "ta-pago-app-6d455.firebaseapp.com",
  projectId: "ta-pago-app-6d455",
  storageBucket: "ta-pago-app-6d455.firebasestorage.app",
  messagingSenderId: "159665577019",
  appId: "1:159665577019:web:966632b24c00de5560901e",
  measurementId: "G-1QTF9JKL0W"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);


// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
