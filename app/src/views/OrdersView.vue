<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Clock, Package, ChevronDown, ChevronUp } from 'lucide-vue-next'
import store from '../store'
import ApiService from '../services/api'

interface OrderItem {
  id: number
  productId: number
  productName: string
  productImage: string
  quantity: number
  price: number
}

interface Order {
  id: number
  userId: number
  createdAt: string
  total: number
  itemCount: number
  items: OrderItem[]
}

const router = useRouter()
const api = new ApiService()

const orders = ref<Order[]>([])
const loading = ref(true)
const error = ref('')
const expandedOrders = ref<Set<number>>(new Set())

const currentUser = store.getters.getCurrentUser()

const toggleOrderExpansion = (orderId: number) => {
  if (expandedOrders.value.has(orderId)) {
    expandedOrders.value.delete(orderId)
  } else {
    expandedOrders.value.add(orderId)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadOrders = async () => {
  if (!currentUser) {
    router.push('/')
    return
  }

  try {
    loading.value = true
    const response = await api.get<Order[]>(`/order/user/${currentUser.id}`)

    if (response.success) {
      orders.value = response.data
    } else {
      error.value = response.message || 'Erreur lors du chargement des commandes'
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement des commandes'
    console.error('Erreur:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24">
    <section class="mb-12">
      <h1 class="text-4xl font-bold text-center mb-6">Vos commandes</h1>
      <p class="text-xl text-center text-gray-600 mb-8">
        Retrouvez l'historique de toutes vos commandes
      </p>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button @click="loadOrders" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Réessayer
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow-sm border p-12 text-center">
      <Package class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucune commande</h3>
      <p class="text-gray-600 mb-6">Vous n'avez pas encore passé de commande</p>
      <button @click="router.push('/products')"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Découvrir nos produits
      </button>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="bg-white rounded-lg shadow-sm border overflow-hidden">

        <!-- Order Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                Commande #{{ order.id }}
              </h3>
              <div class="flex items-center text-sm text-gray-600 mt-1">
                <Clock class="w-4 h-4 mr-1" />
                {{ formatDate(order.createdAt) }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900">
                {{ (order.total || 0).toFixed(2) }} €
              </div>
              <div class="text-sm text-gray-600">
                {{ order.itemCount || 0 }} article{{ (order.itemCount || 0) > 1 ? 's' : '' }}
              </div>
            </div>
          </div>

          <!-- Toggle Button -->
          <button @click="toggleOrderExpansion(order.id)"
            class="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <span class="text-sm font-medium text-gray-700">
              {{ expandedOrders.has(order.id) ? 'Masquer' : 'Voir' }} le détail
            </span>
            <ChevronDown v-if="!expandedOrders.has(order.id)" class="w-4 h-4 text-gray-500" />
            <ChevronUp v-else class="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <!-- Order Details (Expanded) -->
        <div v-if="expandedOrders.has(order.id)" class="p-6">
          <h4 class="font-semibold text-gray-900 mb-4">Articles commandés</h4>
          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.id"
              class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">

              <!-- Product Image -->
              <div class="flex-shrink-0">
                <img :src="`http://localhost:8000/images/${item.productImage}`" :alt="item.productName"
                  class="w-16 h-16 object-cover rounded-lg"
                  @error="(e) => (e.target as HTMLImageElement).src = '/placeholder-food.jpg'" />
              </div>

              <!-- Product Info -->
              <div class="flex-1">
                <h5 class="font-semibold text-gray-900">{{ item.productName }}</h5>
                <p class="text-sm text-gray-600">Quantité: {{ item.quantity }}</p>
                <p class="text-sm text-gray-600">Prix unitaire: {{ (item.price || 0).toFixed(2) }} €</p>
              </div>

              <!-- Item Total -->
              <div class="text-right">
                <div class="font-semibold text-gray-900">
                  {{ ((item.price || 0) * (item.quantity || 0)).toFixed(2) }} €
                </div>
              </div>
            </div>
          </div>

          <!-- Order Total -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-900">Total de la commande</span>
              <span class="text-2xl font-bold text-gray-900">{{ (order.total || 0).toFixed(2) }} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="mt-8 text-center">
      <button @click="router.push('/')"
        class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
        Retour à l'accueil
      </button>
    </div>
  </main>
</template>
