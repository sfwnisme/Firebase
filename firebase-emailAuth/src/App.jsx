import React, { useEffect, useState } from 'react'
import './App.css'
import { onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase-config'

const App = () => {


  const [createEmail, setCreateEmail] = useState('')
  const [createPassword, setCreatePassowrd] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [user, setUser] = useState({})

  // functions
  useEffect(() => {
    // trigger user state changes
    // warning: because onAuthStateChange is a SERVER EFEECTOR it should be in ->
    //-> a useEffect hook to manage the state changes and prevent or avert APP FREEZING
    onAuthStateChanged(auth, (currentUser) => {
      // current user parameter refers to the user's credential info 
      setUser(currentUser)
    })
  }, [])

  // create new user
  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, createEmail, createPassword)
      console.log('User Created', user)
    } catch (error) {
      console.log(error.message)
      console.log(error)
      error.message == 'Firebase: Error (auth/missing-password).' && console.warn('password missed')
      error.message == 'Firebase: Error (auth/email-already-in-use).' && console.warn('User already in use')
    }
  }

  // sign in user 
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    } catch (error) {
      console.log('signin error', error.message)
    }
  }

  // sign out user
  const signout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='App'>
      <div>
        <h3>Register User</h3>
        <input placeholder="Email..." type='text' onChange={(event) => { setCreateEmail(event.target.value) }} />
        <input placeholder="Password..." type='text' onChange={(event) => { setCreatePassowrd(event.target.value) }} />
        <button onClick={signUp}>Create User</button>
      </div>
      <div>
        <h3>Sign In</h3>
        <input placeholder="Email..." type='text' onChange={(event) => { setSignInEmail(event.target.value) }} />
        <input placehoder="Password..." type='text' onChange={(event) => { setSignInPassword(event.target.value) }} />
        <button onClick={signIn}>Sign In</button>
      </div>
      <h4>User Logged In:     {user?.email}</h4>
      <button onClick={signout}>Sign Out</button>
    </div>
  )
}

export default App