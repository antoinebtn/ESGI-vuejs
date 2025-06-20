import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

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
  // Vérifier si la route requiert une authentification
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Vérifier si l'utilisateur est authentifié
    if (!store.getters.isAuthenticated()) {
      console.log("Redirection due à l'authentification requise")
      // Rediriger vers la page d'accueil si non authentifié avec un paramètre de requête
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
