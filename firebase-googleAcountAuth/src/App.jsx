import React, { useEffect, useState } from 'react'
import { auth, provider } from './firebase-config'
import { signInWithPopup, signOut } from 'firebase/auth'

const App = () => {

  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [photo, setPhoto] = useState('')


  // sign in with google 
  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const { displayName, email, photoURL } = response.user

      setName(displayName)
      setUserEmail(email)
      setPhoto(photoURL)

    } catch (error) {
      console.log('sign in error', error.message)
    }
  }

  const signout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <button onClick={signInWithGoogle} type="button" className="login-with-google-btn" >
        Sign in with Google
      </button>
      <button onClick={signout}>sign out</button>
      <div>
        <h1>{name}</h1>
        <p>{userEmail}</p>
        <img src={photo} alt="" />
      </div>
    </div>
  )
}

export default App