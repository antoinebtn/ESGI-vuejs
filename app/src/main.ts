import './assets/main.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const savedUserName = localStorage.getItem('userName')
if (savedUserName) {
  store.mutations.setUserName(savedUserName)
}

store.mutations.loadCartFromStorage()

const originalSetUserName = store.mutations.setUserName
store.mutations.setUserName = (name: string) => {
  originalSetUserName(name)
  localStorage.setItem('userName', name)
}

const app = createApp(App)

app.use(router)

app.mount('#app')
