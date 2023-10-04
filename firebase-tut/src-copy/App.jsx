import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { db } from './firebase-config'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  const usersCollectionRef = collection(db, 'users')

  // ?snapshot way
  useEffect(() => {
    const getUsers = () => {
      onSnapshot(usersCollectionRef, (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })

    }
    getUsers()
  }, [])

  // ?getDocs way
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef)
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   }
  //   getUsers()
  // }, [])

  const createUser = async () => {
    const newUser = { id: Math.random(), name: name, age: age }
    await addDoc(usersCollectionRef, newUser)
  }

  const updateAge = async (id, age) => {
    const ageRef = doc(db, 'users', id)
    const newField = { age: age + 1 }
    await updateDoc(ageRef, newField)
  }

  const deleteUser = async (id) => {
    const userRef = doc(db, 'users', id)
    await deleteDoc(userRef)
  }

  console.log(users)
  return (

    <div className="App">

      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      <button onClick={createUser}>Craete User</button>

      {users.map(({ id, name, age }) =>
        <div className="user" key={id}>
          <button onClick={() => deleteUser(id)}>x</button>
          <h1>{name}</h1>
          <h1>{age}</h1>
          <button onClick={() => updateAge(id, age)}>Increase Age</button>
        </div>
      )}
    </div>
  )
}

export default App
