import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../Views/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../Views/ProductsView.vue'),
    },
  ],
})

export default router
