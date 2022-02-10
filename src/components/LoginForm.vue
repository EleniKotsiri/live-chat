<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'

export default {
  setup(props, context) {
    // refs
    const email = ref('')
    const password = ref('')

    const { error, login } = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      // emit custom event (Welcome.vue) to redirect to Chatroom.vue on successful login
      if(!error.value) {
        // context.emit instead of this.$emit ('this' is undefined in composition API)
        context.emit('loginEvent')
      }
    }

    return { email, password, handleSubmit, error }
  }

}
</script>

<style>

</style>