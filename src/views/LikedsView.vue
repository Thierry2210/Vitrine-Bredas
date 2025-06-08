<template>
  <div class="px-2 sm:px-8 md:px-20 py-8">
    <h1 class="text-2xl font-bold mb-4 py-4">Meus Favoritos</h1>
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Lista de favoritos -->
      <div class="flex-1">
        <div v-if="favoritos.length > 0">
          <div v-for="(item, index) in favoritos" :key="item.id"
            class="bg-white p-3 mb-3 rounded-lg shadow flex items-center gap-3">
            <router-link :to="{ name: 'produto', params: { id: item.id } }">
              <img :src="getImage(item)" alt="Produto" class="w-14 h-14 object-cover rounded" />
            </router-link>
            <div class="flex-1">
              <router-link :to="{ name: 'produto', params: { id: item.id } }">
                <p class="font-semibold text-sm hover:underline">{{ item.nome }}</p>
              </router-link>
              <p class="text-gray-600 text-xs">
                Categoria: {{ categorias[item.categoriaId] || 'Categoria desconhecida' }}
              </p>
              <p class="text-gray-600 text-xs">Preço: {{ formatCurrency(item.preco) }}</p>
            </div>
            <button @click="removerFavoritos(item)" class="text-blue-500 hover:underline text-xs">
              Remover
            </button>
          </div>
        </div>
        <div v-else class="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center min-h-[240px]">
          <img src="https://img.icons8.com/ios-filled/60/cccccc/like.png" alt="Sem favoritos" class="mb-2 opacity-60" />
          <p class="text-gray-400 text-base mb-1">Nenhum produto favoritado</p>
          <p class="text-gray-400 text-xs">Adicione produtos aos favoritos para vê-los aqui.</p>
        </div>
      </div>

      <!-- Resumo dos favoritos -->
      <div class="w-full max-w-xs bg-white p-4 rounded-lg shadow self-start">
        <h2 class="text-lg font-bold mb-3">Resumo</h2>
        <div class="flex justify-between mb-2 text-sm">
          <span>Total de favoritos:</span>
          <span>{{ favoritos.length }}</span>
        </div>
        <div class="flex justify-between mb-2 text-sm">
          <span>Valor total:</span>
          <span>{{ formatCurrency(totalFavoritos) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { favoritos, toggleFavorito } from '@/assets/js/favoritoStore.js'

const categorias = {
  4: 'Smartphones',
  5: 'Notebooks',
  6: 'Consoles',
  7: 'Smart TVs',
  8: 'Periféricos Gamer',
  9: 'Fones de Ouvido'
}

function removerFavoritos(item) {
  toggleFavorito(item)
}

const totalFavoritos = computed(() =>
  favoritos.value.reduce((sum, item) => sum + (item.preco || 0), 0)
)

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function getImage(item) {
  const img = item.imagens?.[0]
  return typeof img === 'string'
    ? img
    : img?.urlImagem || 'https://via.placeholder.com/60x60?text=Sem+Imagem'
}
</script>