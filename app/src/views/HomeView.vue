<script setup lang="ts">
import logoUrl from '@/assets/logo.png'

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
      <div class="w-1/2 flex flex-col justify-center pr-8">
        <p class="text-2xl font-semibold text-green-500 mb-4">Bun Appetit</p>
        <p class="text-lg text-gray-700 mb-6">
          Découvrez nos burgers faits maison, préparés avec des ingrédients frais et de qualité. Que vous soyez fan de
          viande, végétarien ou amateur de saveurs audacieuses, nous avons le burger parfait pour vous.
        </p>
      </div>
      <img :src="logoUrl" alt="Logo Bun Appetit" class="w-128 h-128 object-contain" />
    </div>
  </main>
</template>
