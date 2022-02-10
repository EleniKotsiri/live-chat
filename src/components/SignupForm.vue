<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="display name" v-model="displayName">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password (at least 6 characters long)" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'

export default {
  setup(props, context) {
    // refs
    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    // useSignup
    const { error, signup } = useSignup()

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value)
      // emit custom event (Welcome.vue) to redirect to Chatroom.vue on successful signup
      if(!error.value) {
        // context.emit instead of this.$emit ('this' is undefined in composition API)
        context.emit('signupEvent')
      }
    }

    return { displayName, email, password, handleSubmit, error }
  }

}
</script>

<style>

</style>