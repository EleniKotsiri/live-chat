<template>
  <div class="welcome container">
    <p> Welcome </p>
    <div v-if="showLogin">
      <h2>Login</h2>
      <LoginForm @loginEvent='enterChatroom' />
      <p>No account yet? <span @click="showLogin = false">Sign up instead</span></p>
    </div>
    <div v-else>
      <h2>Sign up</h2>
      <SignupForm @signupEvent='enterChatroom' />
      <p>Already have an account? <span @click="showLogin = true">Login instead</span></p>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  components: { SignupForm, LoginForm },

  setup() {
    const showLogin = ref(true)
    const router = useRouter()
    // on successful login/signup, redirect user to the chatroom
    const enterChatroom = () => {
      router.push({ name: 'Chatroom' })
    }

    return { showLogin, enterChatroom }
  }

}
</script>

<style>
  .welcome {
    text-align: center;
    padding: 20px 0;
  }
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome button {
    margin: 20px auto;
  }
  /* form styles ended */
  
  .welcome span {
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
  }
</style>