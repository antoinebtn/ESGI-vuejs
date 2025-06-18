<script setup lang="ts">
import { ref } from 'vue'
import store from '../store'

const userName = ref('')
const error = ref('')

const saveName = () => {
  if (userName.value.trim().length < 2) {
    error.value = 'Le nom doit contenir au moins 2 caractères'
    return
  }

  store.mutations.setUserName(userName.value.trim())
  error.value = ''
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Bienvenue chez Bun Appetit</h2>

      <p class="mb-6 text-gray-600">
        Avant de commencer votre commande, nous aimerions connaître votre nom pour personnaliser votre expérience.
      </p>

      <form @submit.prevent="saveName" class="space-y-4">
        <div>
          <label for="userName" class="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
          <input
            id="userName"
            v-model="userName"
            type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Entrez votre nom"
            autocomplete="name"
          />
          <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
