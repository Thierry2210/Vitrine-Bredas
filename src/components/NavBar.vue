<template>
  <div class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo e Menu -->
        <div class="flex items-center">
          <button class="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <i class="bi bi-list text-xl"></i>
          </button>
          <router-link to="/" class="ml-4 flex items-center">
            <img :src="logo" alt="Logo Bredas" class="w-40 h-40 mr-2" />
          </router-link>
        </div>

        <!-- Barra de pesquisa centralizada -->
        <div class="flex-1 max-w-lg mx-8">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="bi bi-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Buscar produtos..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Ícones à direita -->
        <div class="flex items-center space-x-4">
          <router-link to="/login" class="flex items-center text-gray-700 hover:text-gray-900">
            <i class="bi bi-person-circle h-5 w-5 mr-1 text-2xl"></i>
            <img src="/src/assets/img/perfil.png" alt="Entrar/Cadastrar" class="w-5 h-5 mr-1" />
            <span class="text-sm">Entrar/Cadastrar</span>
          </router-link>
          <router-link to="/cart" class="flex items-center text-gray-700 hover:text-gray-900 relative">
            <img src="/src/assets/img/carrinho-de-compras.png" alt="Carrinho" class="w-5 h-5 mr-1" />
            <span class="text-sm">Carrinho</span>
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              v-if="cartItemCount > 0"
            >
              {{ cartItemCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Menu de categorias -->
    <nav class="bg-white border-b flex-row justify-center textalign-center shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-4 overflow-x-auto py-4 justify-center">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center">
            Mercado <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Smartphones <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Computadores <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Notebooks <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Eletrônicos <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Consoles <i class="bi bi-chevron-down ml-1"></i>
          </button>
          <button class="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm whitespace-nowrap flex items-center">
            Esportes <i class="bi bi-chevron-down ml-1"></i>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/img/logo-bredas.svg'

const cartItemCount = ref(1)
</script>