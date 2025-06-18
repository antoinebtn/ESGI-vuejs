<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import UserNameModal from '../components/UserNameModal.vue'
import store from '../store'

const hasUserName = computed(() => store.getters.hasUserName())
const userName = computed(() => store.getters.getUserName())

const categories = ref([
  { id: 1, name: 'Burgers', slug: 'burgers' },
  { id: 3, name: 'Sides', slug: 'sides' },
  { id: 4, name: 'Boissons', slug: 'boissons' },
  { id: 5, name: 'Desserts', slug: 'desserts' }
])

const products = ref([
  { id: 1, name: 'Classic Burger', price: 8.99, category: 'burgers', image: 'classic-burger.jpg', description: 'Notre burger classique avec steak haché, tomate, salade et sauce maison' },
  { id: 2, name: 'Cheese Burger', price: 9.99, category: 'burgers', image: 'cheese-burger.jpg', description: 'Burger avec fromage fondant, steak haché, tomate, oignons et sauce spéciale' },
  { id: 5, name: 'Frites', price: 3.99, category: 'sides', image: 'fries.jpg', description: 'Frites croustillantes et dorées' },
  { id: 6, name: 'Onion Rings', price: 4.99, category: 'sides', image: 'onion-rings.jpg', description: 'Rondelles d\'oignons panées' },
  { id: 7, name: 'Coca-Cola', price: 2.99, category: 'boissons', image: 'coca.jpg', description: 'Coca-Cola bien frais' },
  { id: 8, name: 'Ice Tea', price: 2.99, category: 'boissons', image: 'ice-tea.jpg', description: 'Ice Tea pêche rafraîchissant' },
  { id: 9, name: 'Brownie', price: 4.99, category: 'desserts', image: 'brownie.jpg', description: 'Brownie au chocolat avec noix' },
  { id: 10, name: 'Sundae', price: 5.99, category: 'desserts', image: 'sundae.jpg', description: 'Glace vanille avec sauce chocolat ou caramel' }
])

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(product => product.category === activeCategory.value)
})

const setCategory = (categorySlug: string) => {
  activeCategory.value = categorySlug
}

onMounted(() => {
  console.log('Products view mounted')
})
</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24">
    <UserNameModal v-if="!hasUserName" />

    <section class="mb-12">
      <h1 class="text-4xl font-bold text-center mb-6">Nos Produits</h1>
      <p class="text-xl text-center text-gray-600 mb-8">
        {{ hasUserName ? `${userName}, découvrez notre sélection de burgers et accompagnements` : 'Découvrez notre sélection de burgers et accompagnements' }}
      </p>
    </section>

    <section class="mb-8">
      <div class="flex flex-wrap justify-center gap-2 mb-6">
        <button
          @click="setCategory('all')"
          :class="['px-4 py-2 rounded-full transition-colors duration-200',
                  activeCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
        >
          Tous les produits
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          @click="setCategory(category.slug)"
          :class="['px-4 py-2 rounded-full transition-colors duration-200',
                  activeCategory === category.slug ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
        >
          {{ category.name }}
        </button>
      </div>
    </section>

    <section class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <div class="text-gray-500">Image: {{ product.image }}</div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-bold">{{ product.name }}</h3>
              <span class="text-green-600 font-bold">{{ product.price.toFixed(2) }} €</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
            <button class="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
