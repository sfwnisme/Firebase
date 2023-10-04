import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDVjI198cc0i4IwIY6KJcMdS9dp2Nv4bXQ",
  authDomain: "fir-tutorial-806a8.firebaseapp.com",
  projectId: "fir-tutorial-806a8",
  storageBucket: "fir-tutorial-806a8.appspot.com",
  messagingSenderId: "83566289205",
  appId: "1:83566289205:web:6e84d09144f71d82f32c7c"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)