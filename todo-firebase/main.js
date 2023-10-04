import { handleAuth } from '/auth'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { handleTodos } from './todos';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj2uaG5haVrtwZJYzkeypeHbOCcV-c2i4",
  authDomain: "fir-cc-a5503.firebaseapp.com",
  projectId: "fir-cc-a5503",
  storageBucket: "fir-cc-a5503.appspot.com",
  messagingSenderId: "126671367263",
  appId: "1:126671367263:web:a60cdc9f0f2ea58aac7fea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

handleAuth(app)
handleTodos(db)