<template>
  <!-- Banner/Carousel -->
  <header class="w-full p-0 mt-0 mb-4 border-b">
    <div class="relative w-full overflow-hidden">
      <div class="hidden sm:block">
        <img src="@/assets/img/fullbanner/1.png" alt="" class="w-full" />
      </div>
      <div class="block sm:hidden">
        <img src="@/assets/img/fullbannermobile/1md.png" alt="" class="w-full" />
      </div>
    </div>
  </header>

  <!-- Categorias -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        Compre nas <span class="text-blue-500">Melhores Categorias</span>
      </h2>
      <button class="text-blue-500 hover:text-blue-600 flex items-center">
        Ver todas
        <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
      <div v-for="category in categories" :key="category.name" class="text-center">
        <div
          class="w-20 h-20 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
          <img :src="category.icon" :alt="category.name" class="w-12 h-12 object-contain" />
        </div>
        <p class="text-sm font-medium text-gray-900">{{ category.name }}</p>
      </div>
    </div>
  </section>

  <!-- Destaques -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        Destaques <span class="text-blue-500">Smartphone</span>
      </h2>
      <button class="text-blue-500 hover:text-blue-600 flex items-center">
        Ver todas
        <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Cards adaptados -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
      <div v-for="product in filteredProducts" :key="product.idProduto"
        class="bg-white rounded shadow p-4 hover:shadow-md transition-all flex flex-col">

        <!-- Imagem + Badge -->
        <div class="relative mb-3">
          <img :src="product.imagens[0]?.urlImagem || 'https://via.placeholder.com/200x200?text=Sem+Imagem'"
            :alt="product.descricao" class="w-full h-32 object-cover rounded" />
          <div v-if="product.percentualDesconto"
            class="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
            {{ product.percentualDesconto }}% OFF
          </div>
        </div>

        <!-- Info -->
        <div class="flex flex-col flex-grow justify-between">
          <h3 class="text-sm font-semibold mb-1">{{ product.descricao }}</h3>
          <p class="text-xs text-gray-500 mb-1">{{ product.marca }}</p>

          <div class="mb-1">
            <span class="text-blue-600 font-bold">{{ formatCurrency(product.valorVenda) }}</span>
            <span v-if="product.valorDe && product.valorDe > product.valorVenda"
              class="line-through text-sm text-gray-400 ml-1">
              {{ formatCurrency(product.valorDe) }}
            </span>
          </div>

          <p v-if="product.qtdParcelas && product.valorParcela" class="text-xs text-gray-500 mb-2">
            ou {{ product.qtdParcelas }}x de {{ formatCurrency(product.valorParcela) }}
          </p>

          <button class="bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm"
            @click="adicionarCarrinho(product)">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- WhatsApp -->
  <div class="whatsapp">
    <a id="whatsapp" href="https://wa.me/5514996418461?text=Olá, poderia me ajudar?" target="_blank"
      class="fixed w-[60px] h-[60px] bottom-10 right-10 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-50">
      <i class="bi bi-whatsapp"> <img src="/src/assets/img/whatsapp.png" alt="" class="justify-center h-10 w-10"></i>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const search = ref('')
const products = ref([])

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function adicionarCarrinho(produto) {
  console.log('Adicionado ao carrinho:', produto)
}

const filteredProducts = computed(() => {
  if (!search.value) return products.value
  return products.value.filter(p =>
    p.descricao?.toLowerCase().includes(search.value.toLowerCase())
  )
})

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

async function getProducts(token) {
  try {
    const response = await fetch(productApi, {
      method: 'GET',
      headers: { 'Authorization': token }
    });
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    const data = await response.json();
    products.value = data.data || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
}

onMounted(async () => {
  const token = await getToken()
  if (token) await getProducts(token)
})

const categories = [
  { name: 'Smartphones', icon: '/src/assets/img/categorias/smartphone.png' },
  { name: 'Notebooks', icon: '/src/assets/img/categorias/notebook.png' },
  { name: 'Games', icon: '/src/assets/img/categorias/games.png' },
  { name: 'TVs', icon: '/src/assets/img/categorias/tv.png' },
  { name: 'Áudio', icon: '/src/assets/img/categorias/audio.png' },
  { name: 'Eletrodomésticos', icon: '/src/assets/img/categorias/eletro.png' },
  { name: 'Acessórios', icon: '/src/assets/img/categorias/acessorios.png' },
]

</script>