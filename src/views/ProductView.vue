<template>
  <div>
    <section class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto">
      <!-- Imagens -->
      <div>
        <div class="flex flex-col gap-4">
          <img :src="mainImg" alt="Imagem Principal" class="rounded-lg shadow w-full max-w-md mx-auto" />
          <div class="flex gap-2">
            <img v-for="(img, idx) in thumbs" :key="idx" :src="img"
              class="w-20 h-20 object-cover border cursor-pointer rounded transition-transform hover:scale-105"
              :class="{ 'ring-2 ring-blue-400': mainImg === img }" @click="mainImg = img" />
          </div>
        </div>
      </div>

      <!-- Detalhes do Produto -->
      <div class="p-4 border rounded-lg shadow relative">
        <!-- Botão de Favoritar -->
        <button @click="toggleFavorito(product)" class="absolute top-4 right-4 z-10"
          :aria-label="isFavorito(product) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
          <svg v-if="isFavorito(product)" xmlns="http://www.w3.org/2000/svg" fill="#ff0000" viewBox="0 0 24 24"
            class="w-7 h-7">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-width="2"
            viewBox="0 0 24 24" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <div v-if="loading" class="flex items-center justify-center h-40">
          <span class="text-blue-600 font-bold">Carregando...</span>
        </div>
        <div v-else>
          <span v-if="product.novo" class="bg-yellow-200 text-yellow-800 px-2 py-1 text-xs rounded">Novo</span>
          <h1 class="text-2xl font-bold mt-2">{{ product.descricao }}</h1>
          <div class="flex items-center gap-1 mt-1">
            <span class="text-yellow-400">★★★★★</span>
            <span>{{ product.avaliacoes || '0 avaliações' }}</span>
          </div>
          <div class="mt-4 text-gray-700">
            <p v-if="product.valorAntigo" class="line-through text-sm">{{ formatCurrency(product.valorAntigo) }}</p>
            <p class="text-3xl font-bold text-blue-600">{{ formatCurrency(product.valorVenda) }}</p>
            <p v-if="product.qtdParcelas && product.valorParcela" class="text-xs text-gray-500 mt-1">
              ou {{ product.qtdParcelas }}x de {{ formatCurrency(product.valorParcela) }}
            </p>
            <span v-if="product.percentualDesconto"
              class="inline-block bg-yellow-400 text-white text-xs px-2 py-1 rounded ml-2">
              {{ product.percentualDesconto }}% OFF
            </span>
          </div>
          <p class="text-sm text-green-600 mt-2">Envio para todo o país</p>
          <p class="text-sm text-gray-600">Estoque disponível</p>

          <div class="flex items-center gap-4 mt-4">
            <label>Quantidade:</label>
            <input type="number" v-model="quantidade" min="1" class="border px-2 py-1 w-16" @input="validateQtd" />
          </div>

          <div class="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <router-link :to="'/cart'" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-center"
              @click="addCarrinho">
              Comprar
            </router-link>
            <button class="border px-6 py-2 rounded hover:bg-gray-100 text-center" @click="addCarrinho">
              + Adicionar ao carrinho
            </button>
            <button class="border px-6 py-2 rounded hover:bg-gray-100 text-center text-red-600"
              @click="removeDoCarrinho" :disabled="quantidade < 1">
              - Remover do carrinho
            </button>
          </div>
          <div v-if="msg" class="mt-2 text-green-600 text-sm">{{ msg }}</div>
          <div class="mt-10">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Características principais</h2>
            <div class="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
              <table class="w-full text-left">
                <tbody>
                  <tr class="border-b hover:bg-gray-50 transition">
                    <td class="px-5 py-4 font-semibold text-gray-700 w-1/3">Marca</td>
                    <td class="px-5 py-4 text-gray-900">{{ product.marca }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition">
                    <td class="px-5 py-4 font-semibold text-gray-700">Modelo</td>
                    <td class="px-5 py-4 text-gray-900">{{ product.modelo }}</td>
                  </tr>
                  <tr v-if="product.cor" class="hover:bg-gray-50 transition">
                    <td class="px-5 py-4 font-semibold text-gray-700">Cor</td>
                    <td class="px-5 py-4 text-gray-900">{{ product.cor }}</td>
                  </tr>
                  <tr v-if="product.peso" class="hover:bg-gray-50 transition">
                    <td class="px-5 py-4 font-semibold text-gray-700">Peso</td>
                    <td class="px-5 py-4 text-gray-900">{{ product.peso }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { adicionarCarrinho, cart } from '@/assets/js/cartStore.js'
import { favoritos, toggleFavorito } from '@/assets/js/favoritoStore.js'

const API_BASE = 'http://localhost:5101/api/Produto'

const route = useRoute()
const product = ref({})
const mainImg = ref('')
const thumbs = ref([])
const quantidade = ref(1)
const loading = ref(true)
const msg = ref('')

function formatCurrency(value) {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function isFavorito(produto) {
  return favoritos.value.some(p => p.idProduto === produto.idProduto)
}

function validateQtd() {
  if (quantidade.value < 1) quantidade.value = 1
}

function addCarrinho() {
  adicionarCarrinho({ ...product.value, quantity: quantidade.value })
  msg.value = 'Produto adicionado ao carrinho!'
  setTimeout(() => (msg.value = ''), 2000)
}

function removeDoCarrinho() {
  const idx = cart.value.findIndex(item => item.idProduto === product.value.idProduto)
  if (idx >= 0) {
    if ((cart.value[idx].quantity || 1) > quantidade.value) {
      cart.value[idx].quantity -= quantidade.value
    } else {
      cart.value.splice(idx, 1)
    }
    localStorage.setItem('cart', JSON.stringify(cart.value))
    msg.value = 'Produto removido do carrinho!'
    setTimeout(() => (msg.value = ''), 2000)
  }
}

// Busca produto por ID na API C#
async function getProduct(id) {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE}/Produto/${id}`)
    if (!response.ok) throw new Error(`Erro: ${response.status}`)
    const data = await response.json()
    product.value = data
    mainImg.value = data.imagens?.[0]?.urlImagem || ''
    thumbs.value = data.imagens?.map(img => img.urlImagem) || []
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getProduct(route.params.id)
})
</script>