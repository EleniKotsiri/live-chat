// signup will sign up a user using projectAuth (firebase auth)
// useSignup is used to return error and signup()
// we don't declare signup() inside useSignup because we don't have to create
// a new instance of signup and ref every time the composable is being called

import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// error is a global value that will get updated only if we get an error
// we don't have to declare it inside any function each time they are being called
const error = ref(null)

// the fields we type in the sign up form
const signup = async (email, password, displayName) => {
  error.value = null // we do this in case user first failed signing up and when they try again,
                     // we reset the value of error to null.
  try {
    // store signup in res
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)

    // if signup fails, throw error:
    if(!res) {
      throw new Error('Could not sign up')
    }
    // update displayName too:
    await res.user.updateProfile({ displayName })
    // console.log(res)
    console.log(res.user)

    return res // return response so we can use it in SignupForm.vue component

  } catch(err) {
      console.log(err.message)
      error.value = err.message
  }

}

const useSignup = () => {

  return { error, signup }
}

export default useSignup