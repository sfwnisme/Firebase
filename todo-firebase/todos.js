import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore"

export const handleTodos = (db) => {

  // collection needs two params (database, name of the collection) 
  const colRef = collection(db, 'todos')

  let todosEl = document.querySelector('#todos')
  onSnapshot(colRef, (snapshot) => {
    console.log('snapshot', snapshot.docs)
    let todosHtml = ''
    const todos = []
    snapshot.docs.forEach((doc) => {
      console.log(doc.data())
      todos.push({ id: doc.id, ...doc.data() })
      console.log('===========todos', todos)

      todosHtml += `
      <div data-id="${doc.id}">
        <label>
          <input type="checkbox" ${doc.data().checked ? 'checked' : ''} data-id="${doc.id}" />
          ${doc.data().title}
        </label>
        <span data-id="${doc.id}"> x </span>
        </div>
        `
      todosEl.innerHTML = todosHtml
    })
    updateTodo(db)
    deleteTodo(db)
  })

  addTodo(colRef)
  // getTodo()
}


const addTodo = (ref) => {
  const todoForm = document.querySelector('.todo-form')
  console.log(todoForm.todo.value)

  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      addDoc(ref, {
        title: todoForm.todo.value, createdAt: serverTimestamp()
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const updateTodo = (db) => {

  const cboxes = document.querySelectorAll('#todos input')
  console.log('==========', cboxes)
  if (!cboxes || !cboxes.length) return;
  cboxes.forEach(cbox => {
    cbox.addEventListener('change', async (e) => {
      console.log("UPDATE_TODO", e.target.getAttribute('data-id'), e.target.checked)

      const id = e.target.getAttribute('data-id')
      const checked = e.target.checked
      const docRef = doc(db, 'todos', id)

      try {
        await updateDoc(docRef, { checked })
        console.log('todo updated')
      } catch (error) {
        console.log(error.message)
      }

    })
  })
}

const deleteTodo = (db) => {
  const deleteBtns = document.querySelectorAll('#todos span')

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id')
      const docRef = doc(db, 'todos', id)
      try {
        deleteDoc(docRef)
      } catch (error) {
        console.log(error.message)
      }
    })
  })
}