import { addDoc, collection } from 'firebase/firestore'
import React, { memo, useEffect, useState } from 'react'
import { auth, db } from '../firebase-confige'
import { useNavigate } from 'react-router-dom'

const CreatePost = (props) => {

  let [title, setTitle] = useState('')
  let [body, setBody] = useState('')
  const navigate = useNavigate()

  const empty = !title && !body

  const colRef = collection(db, 'posts')

  console.log(title, body)

  const savePost = async () => {
    try {
      if (props.isAuth) {
        await addDoc(colRef, { title, body, author: { name: auth.currentUser.displayName, userId: auth?.currentUser.uid } })
        navigate('/')
      }
    } catch (error) {
      console.log(error.message)
    }
  }



  return (
    <div>
      <main>
        <label htmlFor="">title</label>
        <input placholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="">content</label>
        <textarea placholder="body" onChange={(e) => setBody(e.target.value)} />
        <button type="submit" onClick={savePost} disabled={empty}>Post</button>
      </main>
    </div>
  )
}

export default memo(CreatePost)