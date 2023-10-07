import React, { memo, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { CreatePost, Home, Login } from './pages'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-confige'

const App = () => {

  const [isAuth, setIsAuth] = useState(localStorage.isAuth)

  // logout
  const logout = async () => {
    try {
      await signOut(auth)
      setIsAuth(false)
      localStorage.clear()
      location.pathname = '/login'
    } catch (error) {

    }
  }


  // if the user is logged in, disable login page
  useEffect(() => {
    console.log(location.pathname)
    if (isAuth && location.pathname == '/login') {
      location.pathname = '/'
    }
  }, [location.pathname])

  // check the user connection
  const isOnline = navigator.onLine

  console.log('isOnline', isOnline)

  console.log('auth', isAuth)

  return (
    isOnline
      ?
      <Router>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/create-post'>Create Post</NavLink>
          {
            isAuth ? <button onClick={logout}>log out</button> : <NavLink to='/login'>Login</NavLink>
          }
        </nav>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth} />} />
          {!isAuth && <Route path='/login' element={<Login setIsAuth={setIsAuth} isAuth={isAuth} />} />}
          <Route path='/create-post' element={<CreatePost isAuth={isAuth} />} />
        </Routes>
      </Router>
      :
      <mark>Your Not Connected</mark>
  )
}

export default memo(App)