<template>
  <div class="px-2 sm:px-8 md:px-20 py-8">
    <h1 class="text-2xl font-bold mb-4 py-4">Carrinho de Compras</h1>
    <div class="flex flex-col lg:flex-row gap-8">

      <!-- Lista de produtos -->
      <div class="flex-1">
        <div v-if="cart.length > 0" v-for="(item, index) in cart" :key="item.id"
          class="bg-white p-3 mb-3 rounded-lg shadow flex items-center gap-3">
          <router-link :to="`/produto/${item.id}`">
            <img :src="item.imagens?.[0] || 'https://via.placeholder.com/60x60?text=Sem+Imagem'" alt="Produto"
              class="w-14 h-14 object-cover rounded" />
          </router-link>
          <div class="flex-1">
            <p class="font-semibold text-sm">{{ item.nome }}</p>
            <p class="text-gray-600 text-xs">Qtd: {{ item.quantity || 1 }}</p>
            <p class="text-gray-600 text-xs">Preço: {{ formatCurrency(item.preco) }}</p>
          </div>
          <button @click="adicionarItem(item)" class="text-blue-500 hover:underline text-xs">
            Adicionar
          </button>
          <button @click="removeItem(index)" class="text-red-500 hover:underline text-xs">
            Remover
          </button>
        </div>
        <div v-else class="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center min-h-[240px]">
          <img src="https://img.icons8.com/ios-filled/60/cccccc/shopping-cart.png" alt="Carrinho vazio"
            class="mb-2 opacity-60" />
          <p class="text-gray-400 text-base mb-1">Seu carrinho está vazio</p>
          <p class="text-gray-400 text-xs">Adicione produtos para vê-los aqui.</p>
        </div>
      </div>

      <!-- Resumo do carrinho -->
      <div class="w-full max-w-xs bg-white p-4 rounded-lg shadow self-start">
        <h2 class="text-lg font-bold mb-3">Resumo do Pedido</h2>
        <div class="flex justify-between mb-2 text-sm">
          <span>Subtotal:</span>
          <span>{{ formatCurrency(totalPrice) }}</span>
        </div>

        <!-- Simulação de frete -->
        <div class="mb-3">
          <label class="block text-xs font-medium mb-1" for="cep">Calcular frete</label>
          <input id="cep" v-model="cep" type="text" maxlength="9" placeholder="Digite seu CEP"
            class="w-full border rounded px-2 py-1 mb-2 text-xs" />
          <button class="bg-blue-600 text-white px-3 py-1 rounded w-full hover:bg-blue-700 text-xs"
            @click="calcularFrete">
            Calcular
          </button>
          <div v-if="frete !== null" class="mt-2 text-green-600 text-xs">
            Frete: {{ formatCurrency(frete) }}
          </div>
        </div>
        <div class="flex justify-between text-base font-semibold border-t pt-3">
          <span>Total:</span>
          <span>{{ formatCurrency(totalPrice + (frete || 0)) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { adicionarCarrinho, cart, removerCarrinho } from '@/assets/js/cartStore.js'
import { ref, computed } from 'vue'

function adicionarItem(item) {
  adicionarCarrinho(item)
}

function removeItem(index) {
  removerCarrinho(index)
}

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.preco * (item.quantity || 1)), 0)
)

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const cep = ref('')
const frete = ref(null)
function calcularFrete() {
  if (cep.value && cep.value.length >= 8) {
    frete.value = 20
  } else {
    frete.value = null
    alert('Digite um CEP válido!')
  }
}
</script>