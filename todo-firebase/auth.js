import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc } from "firebase/firestore"

const todoForm = document.querySelector('.auth-form')

const { password, email } = todoForm
const emailValue = todoForm.email.value
const passwordValue = todoForm.password.value

export const handleAuth = (app) => {
  const auth = getAuth(app)
  handleSignin(auth)
  handleSignUp(auth)

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)
    const userEl = document.querySelector('#user')
    if (user) {
      userEl.innerHTML =
        `
          <p>Hello ${user.email}</p>
          <button type="button" class="auth-logout" >Logout</button>
        `
    } else {
      userEl.innerHTML = ''
    }
    handleLogout(auth)
  })
}



const handleSignUp = (auth) => {
  const signUpBtn = document.querySelector('.auth-signup')

  signUpBtn.addEventListener('click', async (e) => {

    // you need to save the variables into the ==>
    // function to grap the values on click <==
    const emailValue = todoForm.email.value
    const passwordValue = todoForm.password.value
    console.log(emailValue, passwordValue)
    e.preventDefault()
    try {
      console.log('SIGN-UP')
      const credintials = await createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      console.log('credintials', credintials)
    } catch (error) {
      console.log(error)
    }
  })
}

const handleSignin = (auth) => {
  const signinBtn = document.querySelector(".auth-login")

  signinBtn.addEventListener('click', async (e) => {
    const emailValue = todoForm.email.value
    const passwordValue = todoForm.password.value
    e.preventDefault()

    try {
      const credintials = await signInWithEmailAndPassword(auth, emailValue, passwordValue)
      location.reload()
      console.log('credintials', credintials)
    } catch (error) {
      console.log('error')
    }
  })
}

const handleLogout = (auth) => {
  const logoutBtn = document.querySelector('.auth-logout')

  if (!logoutBtn) return;
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      try {
        signOut(auth)
        location.reload()
      } catch (error) {
        console.log(error)
      }
    })
  }
}