<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ApiService from '../services/api'
import ProductCard from '../components/ProductCard.vue'

import type { Product } from '../interfaces/product.ts'

const apiService = new ApiService()

const categories = ref<{ id: number, name: string }[]>([])
const products = ref<Product[]>([])
const fetchProducts = async () => {
  try {
    const response = await apiService.get('/products')
    if (response.success) {
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
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </section>
  </main>
</template>
