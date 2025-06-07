<template>
  <header class="bg-gray-700 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <h1 class="text-blue-600 font-bold text-xl transition-transform motion-safe:hover:scale-110">
            TecnoRay
          </h1>
        </router-link>

        <!-- Botão mobile -->
        <button @click="isOpen = !isOpen"
          class="sm:hidden text-white focus:outline-none focus:ring-2 focus:ring-green-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            stroke-linecap="round" stroke-linejoin="round">
            <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Barra de pesquisa (desktop apenas) -->
        <div class="hidden sm:block flex-1 max-w-md mx-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/src/assets/img/lupa.png" alt="Buscar" class="w-5 h-5 text-gray-400" />
            </div>
            <input v-model="searchTerm" type="text" placeholder="Buscar produtos..." @focus="showResults = true"
              @blur="() => setTimeout(() => showResults = false, 200)" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white
              placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400">
            <div v-if="searchResults.length && showResults"
              class="absolute z-50 bg-white w-full mt-1 rounded shadow max-h-60 overflow-auto">
              <ul>
                <li v-for="product in searchResults" :key="product.id"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  @mousedown.prevent="$router.push(`/product/${product.id}`)">
                  <img :src="product.thumbnail || '/src/assets/img/sem-imagem.png'"
                    class="w-8 h-8 object-cover rounded mr-2" />
                  <span class="truncate">{{ product.title }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Ícones (desktop) -->
        <div class="hidden sm:flex items-center space-x-4 text-white">
          <router-link to="/login" class="flex items-center hover:text-blue-600 motion-safe:hover:scale-110">
            <img src="/src/assets/img/perfil.png" alt="Entrar" class="w-6 h-6 mr-1" />
            <span class="text-sm">Entrar/Cadastrar</span>
          </router-link>

          <router-link to="/likeds" class="flex items-center hover:text-blue-600 motion-safe:hover:scale-110 relative">
            <img src="/src/assets/img/favoritos.png" alt="Favoritos" class="w-5 h-5 mr-1" />
            <span class="text-sm">Favoritos</span>
            <span v-if="favoritosCount > 0"
              class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ favoritosCount }}
            </span>
          </router-link>

          <router-link to="/cart" class="flex items-center hover:text-blue-600 motion-safe:hover:scale-110 relative">
            <img src="/src/assets/img/carrinho-de-compras.png" alt="Carrinho" class="w-5 h-5 mr-1" />
            <span class="text-sm">Carrinho</span>
            <span v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div v-show="isOpen" class="sm:hidden bg-gray-800 px-4 pb-4">
      <!-- Barra de pesquisa mobile -->
      <div class="relative mt-2 mb-4">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="/src/assets/img/lupa.png" alt="Buscar" class="w-5 h-5 text-gray-400" />
        </div>
        <input v-model="searchTerm" type="text" placeholder="Buscar produtos..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-green-400" />
        <div v-if="searchResults.length && showResults"
          class="absolute z-50 bg-white w-full mt-1 rounded shadow max-h-60 overflow-auto">
          <ul>
            <li v-for="product in searchResults" :key="product.id"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              @mousedown.prevent="$router.push(`/product/${product.id}`)">
              <img :src="product.thumbnail || '/src/assets/img/sem-imagem.png'"
                class="w-8 h-8 object-cover rounded mr-2" />
              <span class="truncate">{{ product.title }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Links mobile -->
      <div class="space-y-3 text-white text-sm">
        <router-link to="/login" class="flex items-center hover:text-green-400">
          <img src="/src/assets/img/perfil.png" alt="Entrar" class="w-6 h-6 mr-2" />
          Entrar/Cadastrar
        </router-link>

        <router-link to="/likeds" class="flex items-center hover:text-green-400 relative">
          <img src="/src/assets/img/favoritos.png" alt="Favoritos" class="w-5 h-5 mr-2" />
          Favoritos
          <span v-if="favoritosCount > 0"
            class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ favoritosCount }}
          </span>
        </router-link>

        <router-link to="/cart" class="flex items-center hover:text-green-400 relative">
          <img src="/src/assets/img/carrinho-de-compras.png" alt="Carrinho" class="w-5 h-5 mr-2" />
          Carrinho
          <span v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ cartCount }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { cart } from '@/assets/js/cartStore.js'
import { favoritos } from '@/assets/js/favoritoStore.js'

const isOpen = ref(false)
const searchTerm = ref('')
const searchResults = ref([])
const showResults = ref(false)
const router = useRouter()

// Simulação de busca (substitua por sua API real)
async function fetchProducts(query) {
  if (!query) {
    searchResults.value = []
    return
  }
  // Exemplo usando fetch em uma API fictícia
  const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
  const data = await res.json()
  searchResults.value = data.products || []
}

// Observa mudanças no termo de busca e faz a busca em tempo real
watch(searchTerm, (newTerm) => {
  fetchProducts(newTerm)
})

const favoritosCount = computed(() =>
  favoritos.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
)

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
)
</script>