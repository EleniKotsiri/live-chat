// get currently logged in user using firebase
import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// get current user
const user = ref(projectAuth.currentUser)

// fire function every time auth state has changed (when user logs in/out, sign up)
projectAuth.onAuthStateChanged((_user) => {
  // console.log('User state changed, current user is: ', _user)
  user.value = _user
  // when user is logged out, user.value = null, otherwise its value is an object

})

const getUser = () => {
  return { user }
}

export default getUser