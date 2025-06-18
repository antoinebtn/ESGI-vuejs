<script setup lang="ts">
import { useRouter } from 'vue-router'
import { CheckCircle, LogOut } from 'lucide-vue-next'
import store from '../store'

const props = defineProps({
  orderData: {
    type: Object,
    required: true
  },
  onClose: {
    type: Function,
    required: true
  }
})

const router = useRouter()

const userName = store.getters.getUserName()

const handleLogout = () => {
  store.mutations.logoutUser()
  props.onClose()
  router.push('/')
}

const handleContinue = () => {
  props.onClose()
  router.push('/')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg p-8 w-full max-w-md">
      <div class="text-center mb-6">
        <CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-800">Paiement confirmé</h2>
        <p class="text-gray-600 mt-2">Merci pour votre commande, {{ userName }}!</p>
      </div>

      <div class="bg-green-50 rounded-lg p-4 mb-6">
        <h3 class="font-semibold text-gray-800 mb-3">Récapitulatif de votre commande</h3>

        <div class="space-y-2">
          <div v-for="item in orderData.items" :key="item.id" class="flex justify-between text-sm">
            <span>{{ item.name }} x{{ item.quantity }}</span>
            <span>{{ (item.price * item.quantity).toFixed(2) }} €</span>
          </div>

          <div class="pt-2 mt-2 border-t border-green-200 flex justify-between font-bold">
            <span>Total</span>
            <span>{{ orderData.total.toFixed(2) }} €</span>
          </div>
        </div>
      </div>

      <p class="text-gray-600 mb-6 text-sm">
        Un email de confirmation a été envoyé à votre adresse. Votre commande sera prête dans 15-20 minutes.
      </p>

      <div class="flex flex-col space-y-3">
        <button
          @click="handleContinue"
          class="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Retour à l'accueil
        </button>

        <button
          @click="handleLogout"
          class="w-full px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center"
        >
          <LogOut class="w-4 h-4 mr-2" />
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
</template>
