import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

const authForm = document.querySelector('.auth-form')

export const handleAuth = (app) => {
  const auth = getAuth(app)
  handleLogin(auth)
  handleSignUp(auth)

  const usnsubscribe = onAuthStateChanged(auth, (user) => {
    console.log(user)
    const userSec = document.querySelector('#user')
    if (user) {
      console.log('user is login')
      userSec.innerHTML = `
      <p>Hello ${user.email}</p>
      <button class="logout">Log out</button>
      `
    } else {
      console.log('user is logout')
      userSec.innerHTML = ''
    }
    handleLogout(auth)
  })
}

const handleLogin = (auth) => {
  const { email, password } = authForm
  const loginBtn = document.querySelector('.auth-login')
  loginBtn.addEventListener('click', async (e) => {
    console.log('LOGIN', email.value, password.value)
    try {
      const credintials = signInWithEmailAndPassword(auth, email.value, password.value)
      console.log('credintials', credintials)
    } catch (error) {
      console.log('LOGIN-ERROR', error)
    }
  })
}

const handleSignUp = (auth) => {
  const loginBtn = document.querySelector('.auth-signup')
  loginBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('SIGNUP', authForm.email.value, authForm.password.value)
    try {
      const credintials = await createUserWithEmailAndPassword(auth, authForm.email.value, authForm.password.value)
      console.log('credintials', credintials)
      authForm.reset()
    } catch (error) {
      console.log('SIGNUP-ERROR', error)
    }
  })
}

const handleLogout = (auth) => {
  const logoutBtn = document.querySelector('.logout')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      console.log('LOGOUT',)
      try {
        signOut(auth)
        console.log('signed out')
      } catch ({ message }) {
        console.log(message)
      }
    })
  }
}