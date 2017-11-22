// Vue libs
import Vue from 'vue'
import VueRouter from 'vue-router'

// Other libs
import axios from 'axios'

// Views, components
import Home from '../views/Home.vue'

import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

import Profile from '../views/users/Profile.vue'
import NotFound from '../views/NotFound.vue'
import ScheduleEdit from '../views/schedule/Edit.vue'

// Other components
import store from '../store/store'
import { get } from '../helpers/api'

// Vue use
Vue.use(VueRouter)

// Vue router
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: Home },

    { path: '/login', name: 'login', component: Login, meta: { isLogin: false } },
    { path: '/register', name: 'register', component: Register, meta: { isLogin: false } },

    { path: '/profile', name: 'profile', component: Profile, meta: { isLogin: true } },
    { path: '/schedule/:id/edit', name: 'schedule-edit', component: ScheduleEdit, meta: { isLogin: true } },
    { path: '*', name: 'not-found', component: NotFound }
  ]
})

// Axios global interceptors
axios.interceptors.response.use(null, err => {
  let token = window.localStorage.getItem('token')

  const originalRequest = err.config

  if (err.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    if (!token) {
      router.push({ name: 'login' })
    }
    else {
      return get('/api/refresh-token')
          .then(res => {
            if (res.data.token) {
              window.localStorage.setItem('token', res.data.token)
              originalRequest.headers['Authorization'] = 'Bearer ' + res.data.token
              return axios(originalRequest)
            }
          })
          .catch(error => {
            if (error.response.status === 401 || error.response.status === 500) {
              window.localStorage.removeItem('token')
              router.push({ name: 'login' })
            }
            else {
              window.location.reload()
            }
          })
    }
  }

  if (err.response.status !== 404 && err.response.data.message) {
    store.dispatch('snackbarShow', { color: 'error', text: err.response.data.message })
  }

  return Promise.reject(err)
})

// Protect router
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')

  let isLogin = to.meta.isLogin
  let isLoginUndefined = typeof isLogin === 'undefined'

  if (to.name !== 'login' && !isLoginUndefined && isLogin && !token) {
    next({ name: 'login' })
  }
  else if (to.name !== 'home' && !isLoginUndefined && !isLogin && token) {
    next({ name: 'home' })
  }

  next()
})

export default router
