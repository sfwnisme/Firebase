import React, { memo } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase-confige'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuth, isAuth }) => {

  const navigate = useNavigate()

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider)
      setIsAuth(true)
      localStorage.setItem('isAuth', JSON.stringify(true))
      console.log('login done', user)
      navigate('/')
    } catch (error) {
      console.log('login error', error.message)
    }
  }

  return (
    <div>
      {!isAuth && <button onClick={loginWithGoogle}>login with google</button>}
    </div>
  )
}

export default memo(Login)