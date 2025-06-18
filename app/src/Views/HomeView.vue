<script setup lang="ts">
import { computed } from 'vue'
import UserNameModal from '../components/UserNameModal.vue'
import { Hamburger } from 'lucide-vue-next'
import store from '../store'

const hasUserName = computed(() => store.getters.hasUserName())
const userName = computed(() => store.getters.getUserName())
</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24 min-h-screen flex flex-col">
    <UserNameModal v-if="!hasUserName" />

    <section class="mb-12">
      <h1 class="text-4xl font-bold text-center mb-6">
        {{ hasUserName ? `Bienvenue ${userName}, chez Bun Appetit` : 'Bienvenue chez Bun Appetit' }}
      </h1>
      <p class="text-xl text-center text-gray-600 mb-8">Les meilleurs burgers de la ville, livrés chez vous</p>
    </section>

    <div class="flex-1 flex items-center relative">
      <div class="w-1/2 flex flex-col justify-center pr-8">
        <p class="text-2xl font-semibold text-green-500 mb-4">Bun Appetit</p>
        <p class="text-lg text-gray-700 mb-6">
          Découvrez nos burgers faits maison, préparés avec des ingrédients frais et de qualité. Que vous soyez fan de
          viande, végétarien ou amateur de saveurs audacieuses, nous avons le burger parfait pour vous.
        </p>
      </div>
      <div class="w-1/2"></div>
      <Hamburger
        class="w-128 h-128 text-green-500 absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2" />
    </div>
  </main>
</template>
