<script setup lang="ts">
import { computed, ref } from 'vue'
import { CreditCard, Calendar, Lock } from 'lucide-vue-next'
import store from '../store'
import PaymentConfirmationModal from '../components/PaymentConfirmationModal.vue'
import ApiService from '../services/api'

const apiService = new ApiService()

const cartTotal = computed(() => store.getters.getCartTotal())
const cart = computed(() => store.getters.getCart())

const showConfirmationModal = ref(false)
const orderData = ref<any>({
  items: [],
  total: 0
})

const cardNumber = ref('')
const cardName = ref('')
const expiryDate = ref('')
const cvv = ref('')
const errors = ref({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
})

const closeConfirmationModal = () => {
  showConfirmationModal.value = false
}

const validateForm = () => {
  let isValid = true
  errors.value = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  }

  if (!cardNumber.value.trim()) {
    errors.value.cardNumber = 'Le numéro de carte est requis'
    isValid = false
  } else if (!/^\d{16}$/.test(cardNumber.value.replace(/\s/g, ''))) {
    errors.value.cardNumber = 'Le numéro de carte doit contenir 16 chiffres'
    isValid = false
  }

  if (!cardName.value.trim()) {
    errors.value.cardName = 'Le nom sur la carte est requis'
    isValid = false
  }

  if (!expiryDate.value.trim()) {
    errors.value.expiryDate = 'La date d\'expiration est requise'
    isValid = false
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.value)) {
    errors.value.expiryDate = 'Format invalide (MM/YY)'
    isValid = false
  }

  if (!cvv.value.trim()) {
    errors.value.cvv = 'Le code de sécurité est requis'
    isValid = false
  } else if (!/^\d{3,4}$/.test(cvv.value)) {
    errors.value.cvv = 'Le code de sécurité doit contenir 3 ou 4 chiffres'
    isValid = false
  }

  return isValid
}

const formatCardNumber = () => {
  let value = cardNumber.value.replace(/\D/g, '')
  value = value.substring(0, 16)
  const parts = []
  for (let i = 0; i < value.length; i += 4) {
    parts.push(value.substring(i, i + 4))
  }
  cardNumber.value = parts.join(' ')
}

const formatExpiryDate = () => {
  let value = expiryDate.value.replace(/\D/g, '')
  value = value.substring(0, 4)
  if (value.length > 2) {
    expiryDate.value = `${value.substring(0, 2)}/${value.substring(2)}`
  } else {
    expiryDate.value = value
  }
}

const processPayment = async () => {
  if (validateForm()) {
    try {
      const orderItems = cart.value.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        description: item.description
      }))
      const response = await apiService.post('/order', {
        userId: 1,
        items: orderItems
      })

      if (response.success) {
        orderData.value = {
          items: [...cart.value],
          total: cartTotal.value,
          orderId: (response.data as any)?.data?.orderId || (response.data as any)?.orderId || 'N/A'
        }
        store.mutations.clearCart()
        showConfirmationModal.value = true
      } else {
        console.error('Erreur lors de la création de la commande:', response.message)
        alert('Erreur lors du traitement de la commande. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error)
      alert('Erreur lors du traitement du paiement. Veuillez réessayer.')
    }
  }
}

</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24 min-h-screen">
    <section class="mb-8">
      <h1 class="text-4xl font-bold text-center mb-6">Paiement</h1>
      <p class="text-center text-gray-600 mb-8">Veuillez saisir vos informations de paiement</p>
    </section>

    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Résumé de la commande</h2>

        <!-- Détail des articles du panier -->
        <div class="space-y-3 mb-4">
          <div v-for="item in cart" :key="item.id"
            class="flex justify-between items-center text-gray-700 pb-2 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div class="flex-1">
              <span class="font-medium">{{ item.name }}</span>
              <span class="text-gray-500 ml-2">x{{ item.quantity }}</span>
            </div>
            <span>{{ (item.price * item.quantity).toFixed(2) }} €</span>
          </div>
        </div>

        <!-- Sous-total et total -->
        <div class="space-y-2 pt-2">
          <div class="flex justify-between text-gray-600">
            <span>Sous-total</span>
            <span>{{ cartTotal.toFixed(2) }} €</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Frais de livraison</span>
            <span>Gratuit</span>
          </div>
          <div class="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>{{ cartTotal.toFixed(2) }} €</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-6">Informations de paiement</h2>

        <form @submit.prevent="processPayment" class="space-y-6">
          <!-- Numéro de carte -->
          <div>
            <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
            <div class="relative">
              <CreditCard class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input id="cardNumber" v-model="cardNumber" @input="formatCardNumber" type="text"
                placeholder="1234 5678 9012 3456"
                class="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
            </div>
            <p v-if="errors.cardNumber" class="mt-1 text-sm text-red-600">{{ errors.cardNumber }}</p>
          </div>

          <!-- Nom sur la carte -->
          <div>
            <label for="cardName" class="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
            <input id="cardName" v-model="cardName" type="text" placeholder="NOM Prénom"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
            <p v-if="errors.cardName" class="mt-1 text-sm text-red-600">{{ errors.cardName }}</p>
          </div>

          <div class="flex space-x-4">
            <!-- Date d'expiration -->
            <div class="flex-1">
              <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
              <div class="relative">
                <Calendar class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input id="expiryDate" v-model="expiryDate" @input="formatExpiryDate" type="text" placeholder="MM/YY"
                  class="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
              </div>
              <p v-if="errors.expiryDate" class="mt-1 text-sm text-red-600">{{ errors.expiryDate }}</p>
            </div>

            <!-- CVV -->
            <div class="w-1/3">
              <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input id="cvv" v-model="cvv" type="text" maxlength="4" placeholder="123"
                  class="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
              </div>
              <p v-if="errors.cvv" class="mt-1 text-sm text-red-600">{{ errors.cvv }}</p>
            </div>
          </div>

          <div class="flex justify-between items-center pt-4">
            <router-link to="/cart" class="text-green-600 hover:text-green-800 font-medium">
              &larr; Retour au panier
            </router-link>
            <button type="submit"
              class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              Payer {{ cartTotal.toFixed(2) }} €
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmation de paiement -->
    <PaymentConfirmationModal v-if="showConfirmationModal" :order-data="orderData" :on-close="closeConfirmationModal" />
  </main>
</template>
