<script setup lang="ts">
import { Plus, Minus, Trash2 } from 'lucide-vue-next'
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  getProductQuantityInCart
} from '../utils/product.utils'
import type { Product } from '@/interfaces/product.ts'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-around">
    <div class="h-100 bg-gray-200 flex items-center justify-center">
      <img v-if="product.image" :src="`data:image/jpeg;base64,${product.image}`" :alt="product.name"
        class="w-full h-full object-cover" />
      <div v-else class="text-gray-500">Pas d'image</div>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold">{{ product.name }}</h3>
        <span class="text-green-600 font-bold">{{ product.price.toFixed(2) }} €</span>
      </div>
      <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>

      <button v-if="getProductQuantityInCart(product.id) === 0" @click="addToCart(product)"
        class="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
        Ajouter au panier
      </button>

      <div v-else class="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2">
        <button
          @click="getProductQuantityInCart(product.id) === 1 ? removeFromCart(product.id) : decrementQuantity(product.id)"
          class="flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors duration-200">
          <Trash2 v-if="getProductQuantityInCart(product.id) === 1" class="w-4 h-4" />
          <Minus v-else class="w-4 h-4" />
        </button>

        <span class="text-lg font-semibold text-green-700 px-4">
          {{ getProductQuantityInCart(product.id) }}
        </span>

        <button @click="incrementQuantity(product.id)"
          class="flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors duration-200">
          <Plus class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
