import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue'
// import LoginPage from '../views/LoginPage.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/front/HomeView.vue'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/front/HomePage.vue'),
        },
        {
          path: 'orders',
          component: () => import('@/views/front/OrderPage.vue'),
        },

      ],
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
          path: 'manageproducts',
          component: () => import('../views/dashboard/ManageProducts.vue'),
        },
        {
          path: 'manageorders',
          component: () => import('../views/dashboard/ManageOrders.vue'),
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
