import store from '../store/index'

const clearCart = () => {
  store.mutations.clearCart()
}

const proceedToCheckout = (cartPrice: number) => {
  console.log('Procéder au checkout avec:', cartPrice)
  alert('Fonctionnalité de commande en cours de développement!')
}

export default {
  clearCart,
  proceedToCheckout,
}

export { clearCart, proceedToCheckout }
