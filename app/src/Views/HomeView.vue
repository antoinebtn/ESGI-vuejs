<script setup lang="ts">
import { computed } from 'vue'
import UserNameModal from '../components/UserNameModal.vue'
import store from '../store'

const hasUserName = computed(() => store.getters.hasUserName())
const userName = computed(() => store.getters.getUserName())
</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24">
    <UserNameModal v-if="!hasUserName" />

    <section class="mb-12">
      <h1 class="text-4xl font-bold text-center mb-6">
        {{ hasUserName ? `Bienvenue ${userName}, chez Bun Appetit` : 'Bienvenue chez Bun Appetit' }}
      </h1>
      <p class="text-xl text-center text-gray-600 mb-8">Les meilleurs burgers de la ville, livrés chez vous</p>
    </section>
  </main>
</template>
