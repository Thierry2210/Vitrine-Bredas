<template>
  <div class="px-20">
    <h1 class="text-2xl font-bold mb-4 py-4">Meus Favoritos</h1>
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Lista de favoritos -->
      <div class="flex-1">
        <div
          v-if="favoritos.length > 0"
          v-for="(item, index) in favoritos"
          :key="item.idProduto"
          class="bg-white p-3 mb-3 rounded-lg shadow flex items-center gap-3"
        >
          <img
            :src="item.imagens?.[0]?.urlImagem || 'https://via.placeholder.com/60x60?text=Sem+Imagem'"
            alt="Produto"
            class="w-14 h-14 object-cover rounded"
          />
          <div class="flex-1">
            <p class="font-semibold text-sm">{{ item.descricao }}</p>
            <p class="text-gray-600 text-xs">Marca: {{ item.marca }}</p>
            <p class="text-gray-600 text-xs">Preço: {{ formatCurrency(item.valorVenda) }}</p>
          </div>
          <button
            @click="removerFavorito(index)"
            class="text-red-500 hover:underline text-xs">
            Remover
          </button>
        </div>
        <div v-else class="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center min-h-[180px]">
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
import { ref, computed } from 'vue'

const favoritos = ref(JSON.parse(localStorage.getItem('favoritos') || '[]'))

function removerFavorito(index) {
  favoritos.value.splice(index, 1)
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}

const totalFavoritos = computed(() =>
  favoritos.value.reduce((sum, item) => sum + (item.valorVenda || 0), 0)
)

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
</script>