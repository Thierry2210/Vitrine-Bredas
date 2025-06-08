<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="text-center text-blue-600 font-semibold p-6">
      Carregando produto...
    </div>

    <!-- Erro -->
    <div v-else-if="!produto.id" class="text-center text-red-600 font-semibold p-6">
      Produto não encontrado.
    </div>

    <!-- Produto carregado -->
    <div v-else class="container mx-auto py-8">
      <div class="grid md:grid-cols-2 gap-8 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-lg p-0 md:p-8">

        <!-- Galeria de imagens -->
        <div class="flex flex-col items-center justify-center bg-white rounded-l-2xl md:rounded-xl shadow p-6 md:p-10">
          <img :src="mainImg" alt="Imagem Principal"
            class="object-contain w-64 h-64 md:w-80 md:h-80 rounded-xl border-4 border-blue-200 shadow hover:scale-105 transition-transform duration-300" />

          <div class="flex gap-2 mt-4 flex-wrap justify-center">
            <img v-for="(img, idx) in thumbs" :key="idx" :src="img"
              class="w-16 h-16 object-cover border rounded cursor-pointer hover:scale-105 transition-transform duration-200"
              :class="{ 'ring-2 ring-blue-400': mainImg === img }" @click="mainImg = img" />
          </div>
        </div>

        <!-- Detalhes do produto -->
        <div class="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 relative">
          <!-- Botão favorito -->
          <button @click="toggleFavorito(produto)" class="absolute top-4 right-4 z-10"
            :aria-label="isFavorito(produto) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
            <svg v-if="isFavorito(produto)" xmlns="http://www.w3.org/2000/svg" fill="#2563eb" viewBox="0 0 24 24"
              class="w-7 h-7">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#2563eb" stroke-width="2"
              viewBox="0 0 24 24" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <h1 class="text-3xl font-extrabold text-blue-600 mb-2">{{ produto.nome }}</h1>
          <span class="text-sm text-blue-400 uppercase font-medium tracking-wide mb-1">
            {{ categorias[produto.categoriaId] || 'Categoria desconhecida' }}
          </span>
          <div class="flex items-center mb-2">
            <span class="text-yellow-400 text-lg">★★★★★</span>
            <span class="text-sm text-gray-600 ml-2">({{ produto.avaliacoes || 0 }} avaliações)</span>
          </div>

          <p class="text-gray-700 text-justify mb-4">
            {{ produto.descricao || 'Sem descrição disponível.' }}
          </p>

          <div class="mb-2 text-sm">
            <span :class="produto.estoque > 0 ? 'text-green-600' : 'text-red-500'">
              {{ produto.estoque > 0 ? 'Em estoque' : 'Esgotado' }}
            </span>
          </div>

          <span class="text-3xl text-blue-600 font-extrabold mb-4 block">
            {{ formatCurrency(produto.preco) }}
          </span>

          <div class="flex items-center gap-4 mb-4">
            <label for="qtd" class="font-medium text-sm">Quantidade:</label>
            <input id="qtd" type="number" v-model="quantidade" min="1"
              class="border border-blue-300 px-3 py-1 rounded w-20 text-center shadow-sm" @input="validateQtd" />
          </div>

          <div class="flex flex-wrap gap-4 mt-2">
            <button @click="addCarrinho"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-all duration-200 flex items-center gap-2">
              + Adicionar ao Carrinho
            </button>
            <button @click="removeDoCarrinho" :disabled="quantidade < 1"
              class="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition-all duration-200">
              - Remover
            </button>
          </div>

          <div v-if="msg" class="mt-4 text-green-600 text-sm font-medium">
            {{ msg }}
          </div>
        </div>
      </div>

      <!-- Produtos em destaque -->
      <div class="mt-12">
        <h2 class="text-4xl font-bold text-blue-600 mb-4 text-center">Produtos em Destaque</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="destaque in destaques" :key="destaque.id"
            class="bg-white rounded shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col hover:scale-105 p-2">
            <router-link :to="{ name: 'produto', params: { id: destaque.id } }">
              <img :src="destaque.imagens?.[0] || 'https://via.placeholder.com/200x200?text=Sem+Imagem'"
                :alt="`Imagem do produto ${destaque.nome}`" class="object-contain w-full h-32 p-2" />
            </router-link>
            <div class="p-2 flex-1 flex flex-col">
              <h3 class="text-sm font-semibold mb-1 truncate">{{ destaque.nome }}</h3>
              <span class="text-xs text-gray-500 mb-1">{{ categorias[destaque.categoriaId] || 'Sem categoria' }}</span>
              <span class="text-base font-bold text-blue-600 mb-1">{{ formatCurrency(destaque.preco) }}</span>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs mt-auto"
                @click="adicionarCarrinho(destaque)">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { adicionarCarrinho, cart } from '@/assets/js/cartStore.js'
import { favoritos, toggleFavorito } from '@/assets/js/favoritoStore.js'

const API_BASE = "http://localhost:5101/api/Produto"
const route = useRoute()
const produto = ref({})
const mainImg = ref('')
const thumbs = ref([])
const quantidade = ref(1)
const loading = ref(true)
const msg = ref('')
const destaques = ref([])
const categorias = {
  4: 'Smartphones',
  5: 'Notebooks',
  6: 'Consoles',
  7: 'Smart TVs',
  8: 'Periféricos Gamer',
  9: 'Fones de Ouvido'
}

function formatCurrency(value) {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function isFavorito(produtoCheck) {
  return favoritos.value.some(p => p.id === produtoCheck.id)
}

function validateQtd() {
  if (quantidade.value < 1) quantidade.value = 1
}

function addCarrinho() {
  adicionarCarrinho({ ...produto.value, quantity: quantidade.value })
  msg.value = 'Produto adicionado ao carrinho!'
  setTimeout(() => (msg.value = ''), 2000)
}

function removeDoCarrinho() {
  const idx = cart.value.findIndex(item => item.id === produto.value.id)
  if (idx >= 0) {
    cart.value.splice(idx, 1)
    localStorage.setItem('cart', JSON.stringify(cart.value))
    msg.value = 'Produto removido do carrinho!'
    setTimeout(() => (msg.value = ''), 2000)
  }
}

// Busca produto por ID na API C#
async function getProduto(id) {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE}/${id}`)
    if (!response.ok) throw new Error(`Erro: ${response.status}`)
    const data = await response.json()
    produto.value = data
    // Ajuste para imagens: se vier como array de strings ou array de objetos
    if (Array.isArray(data.imagens)) {
      if (typeof data.imagens[0] === 'string') {
        mainImg.value = data.imagens[0]
        thumbs.value = data.imagens
      } else if (typeof data.imagens[0] === 'object' && data.imagens[0].urlImagem) {
        mainImg.value = data.imagens[0].urlImagem
        thumbs.value = data.imagens.map(img => img.urlImagem)
      }
    } else {
      mainImg.value = ''
      thumbs.value = []
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
  } finally {
    loading.value = false
  }
}

// Busca produtos em destaque (exemplo: os 4 primeiros)
async function getDestaques() {
  try {
    const response = await fetch(API_BASE)
    if (!response.ok) throw new Error("Erro ao buscar destaques")
    const data = await response.json()
    // Exclui o produto atual dos destaques e pega os 4 primeiros
    destaques.value = data.filter(p => p.id !== produto.value.id).slice(0, 4)
  } catch (err) {
    destaques.value = []
  }
}

onMounted(async () => {
  await getProduto(route.params.id)
  await getDestaques()
})
</script>