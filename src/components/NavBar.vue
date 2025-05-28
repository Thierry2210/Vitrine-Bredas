<template>
  <div class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo e Menu -->
        <div class="flex items-center">
          <button class="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <i class="bi bi-list text-xl"></i>
          </button>
          <router-link to="/" class="ml-4 flex items-center">
            <img :src="logo" alt="Logo Bredas" class="w-20 h-20 mr-2 motion-safe:hover:scale-110" />
          </router-link>
        </div>

        <!-- Barra de pesquisa centralizada -->
        <div class="flex-1 max-w-lg mx-8">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="bi bi-search text-gray-400"></i>
            </div>
            <input type="text" placeholder="Buscar produtos..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <!-- Ícones à direita -->
        <div class="flex items-center space-x-4 cursor-pointer">
          <router-link to="/login"
            class="flex items-center text-gray-700 hover:text-gray-900 motion-safe:hover:scale-110">
            <i class="bi bi-person-circle h-5 w-5 mr-1 text-2xl"></i>
            <img src="/src/assets/img/perfil.png" alt="Entrar/Cadastrar" class="w-5 h-5 mr-1" />
            <span class="text-sm">Entrar/Cadastrar</span>
          </router-link>
          <router-link to="/likeds"
            class="flex items-center text-gray-700 hover:text-gray-900 motion-safe:hover:scale-110">
            <i class="bi bi-heart h-5 w-5 mr-1 text-2xl"></i>
            <img src="/src/assets/img/like.png" alt="Favoritos" class="w-5 h-5 mr-1" />
            <span class="text-sm">Favoritos</span>
          </router-link>
          <router-link to="/cart"
            class="flex items-center text-gray-700 hover:text-gray-900 relative motion-safe:hover:scale-110">
            <img src="/src/assets/img/carrinho-de-compras.png" alt="Carrinho" class="w-5 h-5 mr-1" />
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              v-if="cartCount > 0">
              {{ cartCount }}
            </span>
            <span class="text-sm">Carrinho</span>
          </router-link>
        </div>

        <!-- Botão de categorias -->
        <button @click="showCategories = !showCategories"
          class="flex items-center space-x-4 cursor-pointer p-2 rounded-md text-gray-400 hover:text-gray-500 motion-safe:hover:scale-110">
          <i class="bi bi-list text-xl"><img src="/src/assets/img/menu.png" alt="" class="h-5 w-5"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Menu de categorias (aparece só se showCategories for true) -->
  <nav v-show="showCategories"
    class="bg-gray-400 border-b flex-row justify-center textalign-center shadow-sm appearance-none sticky top-[64px] z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex space-x-4 overflow-x-auto py-4 justify-center">
        <button class="text-white hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
          Tvs <i class="bi bi-chevron-down ml-1"></i>
        </button>
        <button class="text-white hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
          Smartphones <i class="bi bi-chevron-down ml-1"></i>
        </button>
        <button class="text-white hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
          Computadores <i class="bi bi-chevron-down ml-1"></i>
        </button>
        <button class="text-white hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
          Aúdio <i class="bi bi-chevron-down ml-1"></i>
        </button>
        <button class="text-white hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
          Peliféricos <i class="bi bi-chevron-down ml-1"></i>
        </button>
        <button class="text-white hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
          Consoles <i class="bi bi-chevron-down ml-1"></i>
        </button>
        <button class="text-white hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
          Câmeras <i class="bi bi-chevron-down ml-1"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/img/logo-bredas.svg'
import { cart } from '@/assets/js/cartStore.js'
import { computed } from 'vue'
const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
)

const showCategories = ref(false)
</script>