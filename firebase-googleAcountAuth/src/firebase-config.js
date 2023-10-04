import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHEDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider)
    console.log(response)
    const { displayName, email, photoURL } = response.user
    localStorage.setItem('name', displayName)
    localStorage.setItem('email', email)
    localStorage.setItem('photo', photoURL)
    location.reload()
  } catch (error) {
    console.log(error.message)
  }
}

export const signout = async () => {
  try {
    await signOut(auth)


    console.log('singing out')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('photo')

    location.reload()
  } catch (error) {
    console.log(error.message)
  }
}