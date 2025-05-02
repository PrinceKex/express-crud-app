import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
 {
  path: '/login',
  name: 'Login',
  component: () => import('../views/Login.vue'),
 },
 {
  path: '/register',
  name: 'Register',
  component: () => import('../views/Register.vue'),
 },
 {
  path: '/home',
  name: 'Home',
  component: () => import('../views/Home.vue'),
  meta: { requiresAuth: true },
 },
 {
  path: '/',
  redirect: '/home',
 },
]

const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes,
})

router.beforeEach((to, from, next) => {
 if (to.matched.some((record) => record.meta.requiresAuth)) {
  if (!store.state.auth.isLoggedIn) {
   next('/login')
  } else {
   next()
  }
 } else {
  next()
 }
})

export default router
