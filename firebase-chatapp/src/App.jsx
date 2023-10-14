import React, { useEffect, useRef, useState } from 'react'
import Auth from './components/Auth'
import './App.css'

import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import { auth } from './firebase'
const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)

  const roomRef = useRef(null)
  console.log(room)


  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }
  return (
    <div>
      {
        room ?
          <Chat room={room} />
          :
          <main>
            <input type="text" ref={roomRef} />
            <button onClick={() => setRoom(roomRef.current.value)}>Create Room</button>
          </main>
      }
    </div>
  )
}

export default App