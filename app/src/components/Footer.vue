<script lang="ts" setup>
import logoUrl from '@/assets/logo.png'
</script>

<template>
  <footer class="bg-white shadow-lg border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="flex items-center mb-4 md:mb-0">
          <img :src="logoUrl" alt="Logo" class="h-8 w-8 mr-3">
          <span class="font-bold text-lg text-gray-800">Bun Appetit</span>
        </div>

        <div class="text-gray-500 text-sm">
          © 2025 Bun Appetit. Tous droits réservés.
        </div>
      </div>
    </div>
  </footer>
</template>
