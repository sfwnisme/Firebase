import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQ-X7NJtaYN5oSQTyCyXrQ9ICL1t6BQl0",
  authDomain: "bloge-application.firebaseapp.com",
  projectId: "bloge-application",
  storageBucket: "bloge-application.appspot.com",
  messagingSenderId: "953018906008",
  appId: "1:953018906008:web:0a7a18a589533b1883e7ed"
};

// Initialize appliction with firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

// Database
export const db = getFirestore(app)
