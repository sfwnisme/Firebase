import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'

const Chat = ({ room }) => {

  const [newMessage, setNewMessage] = useState('')
  const [messagesList, setMessagesList] = useState([])

  const messageRef = collection(db, 'messages')

  const sendMessage = async () => {
    try {
      await addDoc(messageRef, {
        text: newMessage,
        user: auth.currentUser.displayName,
        createdAt: serverTimestamp(),
        room,
      })
      console.log(newMessage, auth.currentUser.displayName, serverTimestamp(), room)

      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const queryMessages = query(messageRef, where('room', '==', room))
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      console.log(snapshot)
      snapshot.docs.forEach((doc) => messages.push({ ...doc.data(), id: doc.id, userId: auth.currentUser.uid }))
      setMessagesList(messages)
    })
    console.log(auth.currentUser)
    return () => unsubscribe
  }, [])

  console.log(messagesList)
  console.log(messagesList)

  return (
    <div>
      <div>
        <h1>Messages</h1>
        <ul>
          {
            messagesList.sort((a, b) => a.createdAt - b.createdAt).map((message) => (
              <li key={message.userId} id={message.userId} className={`${auth.currentUser.uid == message.userId.uid ? 'current' : 'client'}`}>
                <span>{message.user}</span>
                {/* <span>{message.createdAt.toDate().toString()}</span> */}
                <p>{message.text}</p>
                {/* {console.log(message.createdAt.toDate())} */}
              </li>
            ))
          }
        </ul>
      </div>
      <input placeholder='type your message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat