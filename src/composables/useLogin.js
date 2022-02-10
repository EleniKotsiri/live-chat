import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// error is a global value that will get updated only if we get an error
// we don't have to declare it inside any function each time they are being called
const error = ref(null)

// the fields we type in the login form
const login = async (email, password) => {
  error.value = null // we do this incase user first failed loging in and when they try again,
                     // we reset the value of error to null.
  try {
    // signInWithEmailAndPassword() firestore auth method to sign in:
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    console.log(res)

    return res // return response so we can use it in LoginForm.vue component

  } catch(err) {
      console.log(err.message)
      error.value = 'Your email or password is incorrect'
  }

}

const useLogin = () => {

  return { error, login }
}

export default useLogin