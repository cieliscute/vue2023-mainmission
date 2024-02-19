import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue'
// import LoginPage from '../views/LoginPage.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/adminlogin',
      component: () => import('@/views/dashboard/LoginPage.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      children: [
        {
          path: 'manageproduct',
          component: () => import('@/views/dashboard/ManageProducts.vue'),
        },
      ],
    },
    // {
    //   path: '/',
    //   redirect: {
    //     name: 'login',
    //   },
    // },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/dashboard/AdminProducts.vue'),
        },
      ],
    },
    // {
    //   path:'/login',
    //   component: () => import('../views/LoginPage.vue')
    // }
  ],
  linkActiveClass: 'active',
});

export default router;
