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
  <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        Compre nas <span class="text-blue-500">Melhores Categorias</span>
      </h2>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 cursor-pointer">
      <div v-for="category in categories" :key="category.name" class="text-center">
        <div
          class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer shadow-lg">
          <img :src="category.icon" :alt="category.name" class="w-20 h-20 object-contain" />
        </div>
        <p class="text-base font-semibold text-gray-900">{{ category.name }}</p>
      </div>
    </div>
  </section>

  <!-- Destaques -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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
        class="bg-white rounded shadow p-4 hover:shadow-md transition-all flex flex-col cursor-pointer motion-safe:hover:scale-110">

        <!-- Imagem + Badge + Favorito -->
        <div class="relative mb-3">
          <img :src="product.imagens[0]?.urlImagem || 'https://via.placeholder.com/200x200?text=Sem+Imagem'"
            :alt="product.descricao" class="w-full h-32 object-cover rounded" />
          <div v-if="product.percentualDesconto"
            class="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
            {{ product.percentualDesconto }}% OFF
          </div>
          <!-- Botão de Favoritar -->
          <button @click.stop="toggleFavorito(product)" class="absolute top-2 right-2 z-10"
            :aria-label="isFavorito(product) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
            <svg v-if="isFavorito(product)" xmlns="http://www.w3.org/2000/svg" fill="#ff0000" viewBox="0 0 24 24"
              class="w-6 h-6">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#f59e42" stroke-width="2"
              viewBox="0 0 24 24" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
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
      <i class="bi bi-whatsapp">
        <img src="/src/assets/img/whatsapp.png" alt="" class="justify-center h-10 w-10" />
      </i>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adicionarCarrinho } from '@/assets/js/cartStore.js'
import { computed } from 'vue'

const search = ref('')
const products = ref([])
const favoritos = ref(JSON.parse(localStorage.getItem('favoritos') || '[]'))

function toggleFavorito(produto) {
  const idx = favoritos.value.findIndex(p => p.idProduto === produto.idProduto)
  if (idx >= 0) {
    favoritos.value.splice(idx, 1)
  } else {
    favoritos.value.push(produto)
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}

function isFavorito(produto) {
  return favoritos.value.some(p => p.idProduto === produto.idProduto)
}


function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
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
  {
    name: 'Smartphones',
    icon: '/src/assets/img/categorias/smartphones.png'
  },
  {
    name: 'Notebooks',
    icon: '/src/assets/img/categorias/notebooks.png'
  },
  {
    name: 'Consoles',
    icon: '/src/assets/img/categorias/consoles.png'
  },
  {
    name: 'Peliféricos',
    icon: '/src/assets/img/categorias/pelifericos.png'
  },
  {
    name: 'TVs',
    icon: '/src/assets/img/categorias/tvs.png'
  }
]
</script>