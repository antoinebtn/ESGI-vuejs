import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { useToast } from 'vue-toastification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated()) {
      // Afficher un toast d'erreur
      const toast = useToast()
      toast.error('Vous devez être connecté pour accéder à cette page', {
        timeout: 4000,
      })

      next({
        path: '/',
        query: { authRequired: 'true' },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
