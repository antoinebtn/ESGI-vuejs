<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Minus, Trash2 } from 'lucide-vue-next'
import ApiService from '../services/api'

import type { Product } from '../interfaces/product.ts'

const apiService = new ApiService()

import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  getProductQuantityInCart
} from '../utils/product.utils'

// const categories = ref([
//   { id: 1, name: 'Burgers', slug: 'burgers' },
//   { id: 3, name: 'Sides', slug: 'sides' },
//   { id: 4, name: 'Boissons', slug: 'boissons' },
//   { id: 5, name: 'Desserts', slug: 'desserts' }
// ])

const categories = ref<{ id: number, name: string }[]>([])
const products = ref<Product[]>([])
const fetchProducts = async () => {
  try {
    const response = await apiService.get('/products')
    if (response.success) {
      // Convertir les prix en nombres
      products.value = (response.data as { data: Product[] }).data.map(product => ({
        ...product,
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
      }))
    }

    const response2 = await apiService.get('/productscat')
    if (response2.success) {
      categories.value = (response2.data as { data: { id: number, name: string }[] }).data
    }

    console.log('Categories fetched:', categories.value)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
  console.log('Products fetched:', products.value)
}

onMounted(() => {
  fetchProducts()
})

const activeCategory = ref<number | 'all'>('all')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(product => product.category === activeCategory.value)
})

const setCategory = (categoryId: number | 'all') => {
  activeCategory.value = categoryId
}
</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24">
    <section class="mb-12">
      <h1 class="text-4xl font-bold text-center mb-6">Nos Produits</h1>
      <p class="text-xl text-center text-gray-600 mb-8">
        Découvrez notre sélection de burgers et accompagnements
      </p>
    </section>

    <section class="mb-8">
      <div class="flex flex-wrap justify-center gap-2 mb-6">
        <button @click="setCategory('all')" :class="['px-4 py-2 rounded-full transition-colors duration-200',
          activeCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']">
          Tous les produits
        </button>
        <button v-for="category in categories" :key="category.id" @click="setCategory(category.id)"
          :class="['px-4 py-2 rounded-full transition-colors duration-200',
            activeCategory === category.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']">
          {{ category.name }}
        </button>
      </div>
    </section>

    <section class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.id"
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
      </div>
    </section>
  </main>
</template>
