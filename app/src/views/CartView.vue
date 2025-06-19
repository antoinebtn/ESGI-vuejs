<script setup lang="ts">
import { computed } from 'vue'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-vue-next'
import store from '../store'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} from '../utils/product.utils'
import {
  clearCart,
  proceedToCheckout
} from '../utils/cart.utils'

const cart = computed(() => store.getters.getCart())
const cartTotal = computed(() => store.getters.getCartTotal())
const cartItemCount = computed(() => store.getters.getCartItemCount())
</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24 min-h-screen">

    <section class="mb-8">
      <h1 class="text-4xl font-bold text-center mb-6">
        Votre panier
      </h1>
    </section>

    <div v-if="cart.length === 0" class="text-center py-16">
      <ShoppingBag class="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">Votre panier est vide</h2>
      <p class="text-gray-500 mb-8">Découvrez nos délicieux produits et ajoutez-les à votre panier</p>
      <router-link to="/products"
        class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
        Voir le menu
      </router-link>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold text-green-800">
            {{ cartItemCount }} article{{ cartItemCount > 1 ? 's' : '' }} dans votre panier
          </span>
          <button @click="clearCart"
            class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200">
            Vider le panier
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div v-for="item in cart" :key="item.id" class="border-b border-gray-200 last:border-b-0 p-6">
          <div class="flex items-center space-x-4">
            <div class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <img v-if="item.image" :src="`data:image/jpeg;base64,${item.image}`" :alt="item.name"
                class="w-full h-full object-cover" />
            </div>

            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ item.name }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ item.description }}</p>
              <p class="text-lg font-bold text-green-600">{{ item.price.toFixed(2) }} €</p>
            </div>

            <div class="flex items-center space-x-3">
              <button @click="item.quantity === 1 ? removeFromCart(item.id) : decrementQuantity(item.id)"
                class="flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors duration-200">
                <Trash2 v-if="item.quantity === 1" class="w-4 h-4" />
                <Minus v-else class="w-4 h-4" />
              </button>

              <span class="text-xl font-semibold text-gray-800 min-w-[2rem] text-center">
                {{ item.quantity }}
              </span>

              <button @click="incrementQuantity(item.id)"
                class="flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors duration-200">
                <Plus class="w-4 h-4" />
              </button>
            </div>

            <div class="text-right min-w-[100px]">
              <p class="text-lg font-bold text-gray-800">
                {{ (item.price * item.quantity).toFixed(2) }} €
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">Résumé de la commande</h3>

        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-gray-600">
            <span>Sous-total ({{ cartItemCount }} articles)</span>
            <span>{{ cartTotal.toFixed(2) }} €</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Frais de livraison</span>
            <span>Gratuit</span>
          </div>
          <div class="border-t pt-2">
            <div class="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>{{ cartTotal.toFixed(2) }} €</span>
            </div>
          </div>
        </div>

        <div class="flex space-x-4">
          <router-link to="/products"
            class="flex-1 px-6 py-3 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors duration-200">
            Continuer mes achats
          </router-link>
          <button @click="proceedToCheckout()"
            class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            Commander ({{ cartTotal.toFixed(2) }} €)
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
