import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Charger les données utilisateur et panier depuis le localStorage
store.mutations.loadUserFromStorage()
store.mutations.loadCartFromStorage()

const app = createApp(App)

app.use(router)
app.mount('#app')
