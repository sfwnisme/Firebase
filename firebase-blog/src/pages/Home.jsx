import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
import React, { memo, useEffect, useState } from 'react'
import { auth, db } from '../firebase-confige'

const Home = (props) => {

  const colRef = collection(db, 'posts')

  const [postsList, setPostsList] = useState([])

  // delete post function
  const deletePost = async (id) => {
    try {
      const post = doc(db, 'posts', id)
      await deleteDoc(post)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      console.log('snapshot', snapshot.docs)
      setPostsList(snapshot.docs.map((snap) => ({ ...snap.data(), id: snap.id })))
    })
  }, [])

  // get data
  // useEffect(() => {
  //   if (props.isAuth && !postsList) {
  //     console.log('empty')
  //   } else {
  //     const getData = async () => {
  //       const data = await getDocs(colRef)
  //       console.log('get data', data)
  //       setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //     }
  //     getData()
  //   }
  // }, [])

  return (
    <div className='home'>
      {
        props.isAuth && postsList.map((post) => (
          <article key={post.id} id={post.id} userid={post.author.userId ? post.author.userId : 'Unknown'}>
            {auth.currentUser.uid == post.author.userId && <button onClick={() => deletePost(post.id)}  >x</button>}
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <span>{post.author.name ? post.author.name : 'Unknown'}</span>
          </article>
        ))
      }
    </div>
  )
}

export default memo(Home)