import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Auth = (props) => {
  const { setIsAuth } = props

  const signin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const { displayName, email, photoURL, refreshToken } = response.user
      console.log(response)
      console.log(displayName, email)

      cookies.set('auth-token', refreshToken)
      setIsAuth(true)
      console.log('refreshToken', refreshToken)

    } catch (error) {
      console.log(Error('signin with popup', error))
    }
  }

  return (
    <div>
      <button onClick={signin} >signin</button>
    </div>
  )

}

export default Auth