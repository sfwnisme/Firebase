import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvbRd-TjXCgLvC-p4mRDUSTa58v5u1uyA",
  authDomain: "chatapp-9453b.firebaseapp.com",
  projectId: "chatapp-9453b",
  storageBucket: "chatapp-9453b.appspot.com",
  messagingSenderId: "413794828814",
  appId: "1:413794828814:web:044571d4a4bc686c8ab25f"
};

const app = initializeApp(firebaseConfig);

// firestore
export const db = getFirestore(app)

// auth
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()