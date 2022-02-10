// get documents from collection
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'


const getCollection = (collection) => {
  const documents = ref(null)
  const error = ref(null)

  // we store the collection to a var so we can use it later if needed
  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt') // show collectionRef chronologically
    // onSnapshot() sets up real-time listener to firestore db
    // each time there is a change in the db we get a snap
    const unsub = collectionRef.onSnapshot((snap) => {
      console.log("snapshot")
      let results = []
      // add each document from documents to results[]
      snap.docs.forEach((doc) => {
        // the right side (results.push..) will run only if doc.data().createdAt is true
        // meaning when there is a change in the db and we get a snapshot from the server side (firebase) and not locally (118)
        // spread operator to add each attribute and their values
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      })
      documents.value = results
      error.value = null
      
      // onSnapshot() we use 2 callback functions instead of using try and catch:
    }, (err) => {
      console.log(err.message)
      documents.value = null
      error.value = 'could not fetch data'
    })

    // For performance reasons we want onSnapshot() to run every time we are logged in on ChatWindow.vue
    // and not on every state change (i.e. not when we are logged out)
    // onInvalidate runs every time the component where we use it (ChatWindow.vue) unmounts (when we log out)
    watchEffect((onInvalidate) => {
      // unsub from previous collection when watcher is stopped (component unmounted)
      onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection