import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Toast configuration
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

store.mutations.loadUserFromStorage()
store.mutations.loadCartFromStorage()

const app = createApp(App)

// Configuration des toasts
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
})

app.use(router)
app.mount('#app')
