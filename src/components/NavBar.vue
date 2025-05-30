<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Menu Hamburguer (mobile) + Logo -->
        <div class="flex items-center">
          <button @click="showCategories = !showCategories"
            class="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none lg:hidden"
            aria-label="Abrir menu de categorias">
            <i class="bi bi-list text-2xl"></i>
          </button>
          <router-link to="/" class="ml-2 flex items-center">
            <img :src="logo" alt="Logo Bredas"
              class="w-14 h-14 sm:w-20 sm:h-20 mr-2 transition-transform motion-safe:hover:scale-110" />
          </router-link>
        </div>

        <!-- Barra de pesquisa centralizada -->
        <div class="flex-1 max-w-lg mx-2 sm:mx-8">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="bi bi-search text-gray-400"></i>
            </div>
            <input type="text" placeholder="Buscar produtos..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <!-- Ícones à direita -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <router-link to="/login"
            class="flex items-center text-gray-700 hover:text-gray-900 motion-safe:hover:scale-110">
            <img src="/src/assets/img/perfil.png" alt="Entrar/Cadastrar" class="w-5 h-5 mr-1" />
            <span class="hidden sm:inline text-sm">Entrar/Cadastrar</span>
          </router-link>
          <router-link to="/likeds"
            class="flex items-center text-gray-700 hover:text-gray-900 relative motion-safe:hover:scale-110">
            <img src="/src/assets/img/like.png" alt="Favoritos" class="w-5 h-5 mr-1" />
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              v-if="favoritosCount > 0">
              {{ favoritosCount }}
            </span>
            <span class="hidden sm:inline text-sm">Favoritos</span>
          </router-link>
          <router-link to="/cart"
            class="flex items-center text-gray-700 hover:text-gray-900 relative motion-safe:hover:scale-110">
            <img src="/src/assets/img/carrinho-de-compras.png" alt="Carrinho" class="w-5 h-5 mr-1" />
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              v-if="cartCount > 0">
              {{ cartCount }}
            </span>
            <span class="hidden sm:inline text-sm">Carrinho</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Menu de categorias (responsivo) -->
    <nav v-show="showCategories"
      class="bg-gray-100 border-b flex-col lg:flex-row justify-center shadow-sm sticky top-[64px] z-40 lg:flex hidden lg:block">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 overflow-x-auto py-4 justify-center">
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            TVs <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Smartphones <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Computadores <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Áudio <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Periféricos <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Consoles <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Câmeras <i class="bi bi-chevron-down ml-1"></i>
          </button>
        </div>
      </div>
    </nav>
    <!-- Menu mobile -->
    <nav v-show="showCategories"
      class="bg-gray-100 border-b flex-col justify-center shadow-sm sticky top-[64px] z-40 lg:hidden">
      <div class="max-w-7xl mx-auto px-2 sm:px-4">
        <div class="flex flex-col space-y-2 py-4">
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-base whitespace-nowrap flex items-center">
            TVs <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-base whitespace-nowrap flex items-center">
            Smartphones <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-base whitespace-nowrap flex items-center">
            Computadores <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-base whitespace-nowrap flex items-center">
            Áudio <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-base whitespace-nowrap flex items-center">
            Periféricos <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-base whitespace-nowrap flex items-center">
            Consoles <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-blue-600 px-4 py-2 text-base whitespace-nowrap flex items-center">
            Câmeras <i class="bi bi-chevron-down ml-1"></i>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import logo from '@/assets/img/logo-bredas.svg'
import { cart } from '@/assets/js/cartStore.js'
import { favoritos } from '@/assets/js/favoritoStore.js'

const favoritosCount = computed(() =>
  favoritos.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
)

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
)

const showCategories = ref(false)
</script>