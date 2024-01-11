import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/managepage',
      component: () => import('../views/ManagePage.vue')
    },
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    }
    // {
    //   path:'/login',
    //   component: () => import('../views/LoginPage.vue')
    // }
  ]
})

export default router
