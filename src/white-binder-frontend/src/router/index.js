// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Wallets from '@/pages/wallets/Wallets.vue'
import Setting from '@/pages/settings/Setting.vue'
import NotFound from '@/pages/error/NotFound.vue'
import Summary from '@/pages/summary/Summary.vue'
import Login from '@/pages/auth/login/Login.vue'
import Register from '@/pages/auth/register/Register.vue'
import WalletDetail from '@/pages/wallets/detail/WalletDetail.vue'
import LandingPage from '../pages/landing/LandingPage.vue'

const routes = [
  {path: '/', name: 'landing', component: LandingPage, meta: { hideSidebar: true }},
  { path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/wallets', name: 'wallets', component: Wallets, meta: { requiresAuth: true } },
  { path: '/setting', name: 'setting', component: Setting, meta: { requiresAuth: true } },
  { path: '/summary', name: 'summary', component: Summary, meta: { requiresAuth: true } },
  { path: "/wallet/:address", name: "WalletDetail", component: WalletDetail, props: true },

  { path: '/login', name: 'login', component: Login , meta: { hideSidebar: true }},
  { path: '/register', name: 'register', component: Register, meta: { hideSidebar: true }},

  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active-link',
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') 
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // go to login page
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next({ name: 'home' }) // default page
  } else {
    next()
  }
})

router.afterEach(() => {
  requestAnimationFrame(() => {
    const scroller = document.getElementById('app-scroll')
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'auto' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  })
})

export default router