<script setup lang="ts">
import { ref } from 'vue'
import logoUrl from '@/assets/logo.png'

const clickCount = ref(0)

const handleLogoClick = () => {
  clickCount.value++
}
</script>

<template>
  <main class="container mx-auto px-4 py-8 pt-24 min-h-screen flex flex-col">
    <section class="mb-12">
      <h1 class="text-4xl font-bold text-center mb-6">
        Bienvenue chez Bun Appetit
      </h1>
      <p class="text-xl text-center text-gray-600 mb-8">Les meilleurs burgers de la ville, livrés chez vous</p>
    </section>

    <div class="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-8 mb-12">
      <div class="lg:w-1/2 flex flex-col justify-center pr-8">
        <p class="text-2xl font-semibold text-green-500 mb-4">Bun Appetit</p>
        <p class="text-lg text-gray-700 mb-6">
          Découvrez nos burgers faits maison, préparés avec des ingrédients frais et de qualité. Que vous soyez fan de
          viande, végétarien ou amateur de saveurs audacieuses, nous avons le burger parfait pour vous.
        </p>
      </div>
      <div class="flex flex-col items-center">
        <img :src="logoUrl" alt="Logo Bun Appetit"
          class="w-128 h-128 object-contain cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 select-none"
          @click="handleLogoClick" draggable="false" />
        <div v-if="clickCount > 0" class="mt-4 text-center">
          <p class="text-2xl font-bold text-green-600">🍔 {{ clickCount }} clics</p>
          <p class="text-sm text-gray-500">Continuez à cliquer pour plus de burgers !</p>
        </div>
      </div>
    </div>
  </main>
</template>
