import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase-config'

const App = () => {
  const [users, setUsers] = useState([]) // make it empty array to looping it from preredering
  const [content, setContent] = useState({
    name: '',
    age: 0
  })

  const colRef = collection(db, 'users')
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log('data', data)
      setUsers(data)
    })
  }, [])
  console.log('users', users)
  console.log(
    content
  )

  const addUser = async () => {
    await addDoc(colRef, content)
  }

  const increaseAge = async (id, age) => {
    const ageDoc = doc(db, 'users', id)
    const newAge = { age: age + 1 }
    await updateDoc(ageDoc, newAge)
  }
  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
  }

  return (
    <div>
      <div>
        <input type='text' value={content.name} onChange={(e) => setContent({ ...content, name: e.target.value })} />
        <input type='number' value={content.age} onChange={(e) => setContent({ ...content, age: e.target.value })} />
        <button onClick={addUser}>Add User</button>
      </div>
      {
        users.map((user) =>
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.age}</p>
            <button onClick={() => increaseAge(user.id, user.age)}>One Year</button>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </div>
        )
      }
    </div>
  )
}

export default App