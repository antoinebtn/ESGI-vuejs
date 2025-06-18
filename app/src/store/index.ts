import { reactive, readonly } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  category: string
  image: string
  description: string
}

interface Store {
  userName: string | null
  cart: CartItem[]
}

const store = reactive<Store>({
  userName: null,
  cart: [],
})

const getters = {
  hasUserName: () => !!store.userName,
  getUserName: () => store.userName,
  getCart: () => store.cart,
  getCartItemCount: () => store.cart.reduce((total, item) => total + item.quantity, 0),
  getCartTotal: () => store.cart.reduce((total, item) => total + item.price * item.quantity, 0),
}

const mutations = {
  setUserName(name: string) {
    store.userName = name
    localStorage.setItem('userName', name)
  },

  logoutUser() {
    store.userName = null
    localStorage.removeItem('userName')
  },
  addToCart(product: Omit<CartItem, 'quantity'>) {
    const existingItem = store.cart.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      store.cart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(store.cart))
  },
  removeFromCart(productId: number) {
    const index = store.cart.findIndex((item) => item.id === productId)
    if (index > -1) {
      store.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(store.cart))
    }
  },
  updateCartItemQuantity(productId: number, quantity: number) {
    const item = store.cart.find((item) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        mutations.removeFromCart(productId)
      } else {
        item.quantity = quantity
        localStorage.setItem('cart', JSON.stringify(store.cart))
      }
    }
  },
  loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        store.cart = JSON.parse(savedCart)
      } catch (error) {
        console.error('Erreur lors du chargement du panier depuis localStorage:', error)
        store.cart = []
      }
    }
  },

  loadUserFromStorage() {
    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      store.userName = savedUserName
    }
  },
  clearCart() {
    store.cart = []
    localStorage.removeItem('cart')
  },
}

export default {
  state: readonly(store),
  getters,
  mutations,
}
