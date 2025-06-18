import store from '../store/index'
import router from '@/router'

const clearCart = () => {
  store.mutations.clearCart()
}

const proceedToCheckout = () => {
  router.push({ path: '/payment' })
}

export default {
  clearCart,
  proceedToCheckout,
}

export { clearCart, proceedToCheckout }
