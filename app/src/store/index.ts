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

interface User {
  id: number
  email: string
  name: string
}

interface Store {
  currentUser: User | null
  isAuthenticated: boolean
  token: string | null
  cart: CartItem[]
}

const store = reactive<Store>({
  currentUser: null,
  isAuthenticated: false,
  token: null,
  cart: [],
})

const getters = {
  isAuthenticated: () => store.isAuthenticated,
  getCurrentUser: () => store.currentUser,
  getToken: () => store.token,
  getCart: () => store.cart,
  getCartItemCount: () => store.cart.reduce((total, item) => total + item.quantity, 0),
  getCartTotal: () => store.cart.reduce((total, item) => total + item.price * item.quantity, 0),
}

const mutations = {
  setAuth(token: string, user: User) {
    store.token = token
    store.currentUser = user
    store.isAuthenticated = true
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },

  logout() {
    store.token = null
    store.currentUser = null
    store.isAuthenticated = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      try {
        store.token = token
        store.currentUser = JSON.parse(userData)
        store.isAuthenticated = true
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error)
        mutations.logout()
      }
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
