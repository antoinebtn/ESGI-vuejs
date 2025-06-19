<script setup lang="ts">
import { ref } from 'vue';
import { authService } from '@/services/authService.ts';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const emit = defineEmits(['close', 'switchToRegister', 'success']);

const login = async () => {
  error.value = '';

  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs';
    return;
  }

  try {
    loading.value = true;
    const response = await authService.login({
      email: email.value,
      password: password.value
    });

    if (response.success) {
      emit('success');
    } else {
      error.value = response.message || 'Erreur de connexion';
    }
  } catch (e) {
    error.value = 'Une erreur est survenue lors de la connexion';
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div @click.stop class="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
      <button @click="emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Connexion</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="votre@email.com"
          >
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="Votre mot de passe"
          >
        </div>

        <div v-if="error" class="text-red-500 text-sm py-2">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            :disabled="loading"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </div>
      </form>

      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Pas encore de compte?
          <a @click="emit('switchToRegister')" class="text-green-600 hover:text-green-700 cursor-pointer">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
