<template>
  <div>
    <!-- Navbar pode ser importada como componente -->
    <NavBar />

    <section class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto">
      <!-- Imagens -->
      <div>
        <div class="flex flex-col gap-4">
          <img :src="mainImg" alt="Imagem Principal" class="rounded-lg shadow w-full max-w-md mx-auto" />
          <div class="flex gap-2">
            <img
              v-for="(img, idx) in thumbs"
              :key="idx"
              :src="img"
              class="w-24 h-24 object-cover border cursor-pointer"
              @click="mainImg = img"
            />
          </div>
        </div>
      </div>

      <!-- Detalhes do Produto -->
      <div class="p-4 border rounded-lg shadow">
        <div class="border p-4 rounded shadow">
          <span v-if="product.novo" class="bg-yellow-200 text-yellow-800 px-2 py-1 text-xs rounded">Novo</span>
          <h1 class="text-2xl font-bold mt-2">{{ product.descricao }}</h1>
          <div class="flex items-center gap-1 mt-1">
            <span class="text-yellow-400">★★★★★</span>
            <span>{{ product.avaliacoes || '0 avaliações' }}</span>
          </div>
          <div class="mt-4 text-gray-700">
            <p v-if="product.valorAntigo" class="line-through text-sm">{{ formatCurrency(product.valorAntigo) }}</p>
            <p class="text-3xl font-bold text-blue-600">{{ formatCurrency(product.valorVenda) }}</p>
          </div>
          <p class="text-sm text-green-600 mt-2">Envio para todo o país</p>
          <p class="text-sm text-gray-600">Estoque disponível</p>

          <div class="flex items-center gap-4 mt-4">
            <label>Quantidade:</label>
            <input type="number" v-model="quantidade" min="1" class="border px-2 py-1 w-16" />
          </div>

          <div class="mt-4 flex gap-4">
            <router-link :to="'/carrinho'" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Comprar</router-link>
            <button class="border px-6 py-2 rounded hover:bg-gray-100">+ Adicionar ao carrinho</button>
          </div>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const product = ref({})
const mainImg = ref('')
const thumbs = ref([])
const quantidade = ref(1)

function formatCurrency(value) {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const tokenApi = 'https://production.bredasapi.com.br/overall/auth/usuario'
const productApi = 'https://production.bredasapi.com.br/erpproduto/integracaounimar'
const post = { Grupo: 'unimar', Login: 'unimar', Senha: 'unimar' }

async function getToken() {
  const tokenExpirado = localStorage.getItem("token_expires");
  if (tokenExpirado && Date.now() < parseInt(tokenExpirado)) {
    return localStorage.getItem("token");
  } else {
    try {
      const response = await fetch(tokenApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      const token = data.data.access_token;
      const expireDate = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("token_expires", expireDate);
      return token;
    } catch (error) {
      console.error('Erro ao gerar token:', error);
      return null;
    }
  }
}

async function getProduct(id, token) {
  try {
    const response = await fetch(productApi, {
      method: 'GET',
      headers: { 'Authorization': token }
    });
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    const data = await response.json();
    const prod = data.data.find(p => p.idProduto == id)
    if (prod) {
      product.value = prod
      mainImg.value = prod.imagens[0]?.urlImagem || ''
      thumbs.value = prod.imagens.map(img => img.urlImagem)
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
  }
}

onMounted(async () => {
  const token = await getToken()
  if (token) {
    await getProduct(route.params.id, token)
  }
})
</script>