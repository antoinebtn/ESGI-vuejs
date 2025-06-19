<script lang="ts" setup>
import { ref, computed } from 'vue'
import logoUrl from '@/assets/logo.png'
import { ShoppingCart, LogIn, LogOut, UserCircle } from 'lucide-vue-next'
import store from '../store'
import LoginModal from './auth/LoginModal.vue'
import RegisterModal from './auth/RegisterModal.vue'
import { authService } from '../services/authService'

const mobileMenuOpen = ref(false)
const cartItemCount = computed(() => store.getters.getCartItemCount())
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const isAuthenticated = computed(() => store.getters.isAuthenticated())
const currentUser = computed(() => store.getters.getCurrentUser())

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const logout = () => {
  authService.logout()
  closeMobileMenu()
}

const openLoginModal = () => {
  showLoginModal.value = true
  closeMobileMenu()
}

const openRegisterModal = () => {
  showRegisterModal.value = true
  closeMobileMenu()
}

const switchToRegister = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

const switchToLogin = () => {
  showRegisterModal.value = false
  showLoginModal.value = true
}

const closeModals = () => {
  showLoginModal.value = false
  showRegisterModal.value = false
}

const handleAuthSuccess = () => {
  closeModals()
}
</script>

<template>
  <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <img :src="logoUrl" alt="Logo" class="h-10 w-10 mr-3">
          <router-link :to="{ name: 'home' }"
            class="text-gray-700  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            <span class="font-bold text-xl hover:text-green-600 text-gray-800">Bun Appetit</span>
          </router-link>
        </div>

        <div class="hidden md:flex flex-1 justify-center">
          <div class="flex items-baseline space-x-8">
            <router-link :to="{ name: 'products' }"
              class="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-green-600 bg-green-50">
              Menu
            </router-link>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <router-link :to="{ name: 'cart' }"
              class="text-gray-700 hover:text-green-600 p-2 rounded-md transition-colors duration-200 block"
              active-class="text-green-600">
              <ShoppingCart />
              <span v-if="cartItemCount > 0"
                class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ cartItemCount }}
              </span>
            </router-link>
          </div>


          <div class="hidden md:flex items-center space-x-2">
            <template v-if="isAuthenticated">
              <div class="flex items-center">
                <UserCircle class="text-green-600 mr-1" size="16" />
                <span class="text-sm mr-2">{{ currentUser?.name }}</span>
                <button @click="logout" class="flex items-center text-gray-700 hover:text-green-600 p-2 rounded-md transition-colors duration-200">
                  <LogOut size="20" />
                </button>
              </div>
            </template>
            <template v-else>
              <button @click="openLoginModal" class="text-gray-700 hover:text-green-600 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                <LogIn class="mr-1" size="16" />
                Connexion
              </button>
              <button @click="openRegisterModal" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200">
                Inscription
              </button>
            </template>
          </div>

          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path :class="{ 'hidden': mobileMenuOpen, 'inline-flex': !mobileMenuOpen }" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path :class="{ 'hidden': !mobileMenuOpen, 'inline-flex': mobileMenuOpen }" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
        <router-link :to="{ name: 'home' }" @click="closeMobileMenu"
          class="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          active-class="text-green-600 bg-green-50">
          Accueil
        </router-link>
        <router-link :to="{ name: 'products' }" @click="closeMobileMenu"
          class="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          active-class="text-green-600 bg-green-50">
          Products
        </router-link>
        <router-link :to="{ name: 'cart' }" @click="closeMobileMenu"
          class="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
          active-class="text-green-600 bg-green-50">
          <ShoppingCart class="mr-2" />
          Panier <span v-if="cartItemCount > 0" class="ml-1">({{ cartItemCount }})</span>
        </router-link>

        <!-- Boutons d'authentification pour mobile -->
        <div class="border-t border-gray-200 my-2 pt-2">
          <template v-if="isAuthenticated">
            <div class="flex items-center px-3 py-2 text-green-600">
              <UserCircle class="mr-2" />
              <span>{{ currentUser?.name }}</span>
            </div>
            <button @click="logout"
              class="text-gray-700 hover:text-green-600 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center">
              <LogOut class="mr-2" />
              Déconnexion
            </button>
          </template>
          <template v-else>
            <button @click="openLoginModal"
              class="text-gray-700 hover:text-green-600 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center">
              <LogIn class="mr-2" />
              Connexion
            </button>
            <button @click="openRegisterModal"
              class="text-gray-700 hover:text-green-600 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center">
              <UserCircle class="mr-2" />
              Inscription
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>

  <LoginModal
    v-if="showLoginModal"
    @close="closeModals"
    @switch-to-register="switchToRegister"
    @success="handleAuthSuccess"
  />
  <RegisterModal
    v-if="showRegisterModal"
    @close="closeModals"
    @switch-to-login="switchToLogin"
    @success="handleAuthSuccess"
  />
</template>
