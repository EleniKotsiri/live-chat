import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style.css' // that way style.css is applied globally

// import firebase auth service
import { projectAuth } from './firebase/config'

let app
// console.log('app value before running anything: ', app)
projectAuth.onAuthStateChanged(() => {
  if(!app) {
    // console.log('if !app: app = createApp..... ')
    app = createApp(App).use(router).mount('#app')
    // console.log(app)
  }
})
