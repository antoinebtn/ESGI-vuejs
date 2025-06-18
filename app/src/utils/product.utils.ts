import store from '../store'

const addToCart = (product: any) => {
  store.mutations.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    description: product.description,
  })
}

const incrementQuantity = (productId: number) => {
  const cartItem = store.getters.getCart().find((item: any) => item.id === productId)
  if (cartItem) {
    store.mutations.updateCartItemQuantity(productId, cartItem.quantity + 1)
  }
}

const decrementQuantity = (productId: number) => {
  const cartItem = store.getters.getCart().find((item: any) => item.id === productId)
  if (cartItem) {
    store.mutations.updateCartItemQuantity(productId, cartItem.quantity - 1)
  }
}

const removeFromCart = (productId: number) => {
  store.mutations.removeFromCart(productId)
}

const getProductQuantityInCart = (productId: number) => {
  const cartItem = store.getters.getCart().find((item: any) => item.id === productId)
  return cartItem ? cartItem.quantity : 0
}

export default {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  getProductQuantityInCart,
}

export { addToCart, incrementQuantity, decrementQuantity, removeFromCart, getProductQuantityInCart }
