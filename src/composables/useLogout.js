import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// error is a global value that will get updated only if we get an error
// we don't have to declare it inside any function each time they are being called
const error = ref(null)

const logout = async () => {
  error.value = null
  try {
    // sign out using firestore auth
    await projectAuth.signOut()

  } catch(err) {
      console.log(err.message)
      error.value = err.message
  }
}

const useLogout = () => {
  return { logout, error }
}

export default useLogout