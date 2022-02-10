import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Chatroom from '../views/Chatroom.vue'
import { projectAuth } from '../firebase/config'

// Auth Route Guard (added beforeEnter: requireAuth in chatroom route)
// to: route we are going to
// from: route we came from
// next(): either give access to user (to) or redirect them
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  // if user hasn't signed in/up, they can't enter the chatroom
  if(!user) {
    next({ name: 'Welcome'})
  } else {
    next()
  }
}

// redirect to Chatroom if user is logged in
const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser

  if(user) {
    next({ name: 'Chatroom'})
  } else {
    next()
  }

}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requireAuth // if user hasn't signed in/up, they can't enter the chatroom
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
