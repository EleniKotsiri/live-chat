<template>
  <form>
    <textarea
      placeholder="Type a message, hit enter to send.."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'

export default {
  setup() {
    const { user } = getUser()
    const { addDoc, error } = useCollection('messages') // messages is the name of the collection

    const message = ref('')


    const handleSubmit = async () => {
      // when user enters a message, we want to show: who entered the message (name),
      // the message itself (message) and when it was sent (createdAt)
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
      }

      await addDoc(chat)
      if(!error.value) {
        // set textarea blank so the user can send a new message
        message.value = ''
      }
    }

    return { message, handleSubmit, error }
  }
}
</script>

<style scoped>
  form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }

</style>