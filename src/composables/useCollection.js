import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
  // there are many collections showed at the same time. Each collection
  // can have its own error, so we declare error inside the function
  const error = ref(null)

  const addDoc = async (doc) => {
    // console.log(addDoc)
    error.value = null // reset errors at the start of every request (to add a document)

    try {
      // add a new document to the collection
      await projectFirestore.collection(collection).add(doc)

    } catch(err) {
      console.log(err.message)
      error.value = 'could not post'
    }
  }
  
  return { error, addDoc }

}

export default useCollection