<template>
    <!-- Container principal -->
    <div class="min-h-screen rounded-lg shadow bg-gradient-to-b from-blue-50 to-white">
        <div class="container mx-auto px-4">
            <!-- Título -->
            <h1 class="text-2xl sm:text-3xl font-bold text-blue-600 text-center">Produtos em Destaque</h1>
            <p class="text-gray-600 text-center mt-2">
                Descubra nossa seleção de produtos em destaque, com qualidade e preços imbatíveis!
            </p>
        </div>

        <main class="container mx-auto px-2 sm:px-4 py-8">
            <!-- Mensagem de erro -->
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
                {{ error }}
            </div>

            <!-- Lista de produtos -->
            <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                <div v-for="produto in produtos" :key="produto.id"
                    class="bg-white rounded shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col transition hover:scale-105 p-2 sm:p-2">
                    <!-- Imagem do produto -->
                    <div class="relative w-full aspect-[4/4] bg-white mb-2">
                        <router-link :to="`/produto/${produto.id}`">
                            <img :src="produto.imagens?.[0] || 'https://via.placeholder.com/200x200?text=Sem+Imagem'"
                                :alt="`Imagem do produto ${produto.nome}`" class="object-contain w-full h-full p-2" />
                        </router-link>

                        <!-- Ícone de favorito -->
                        <button @click="toggleFavorito(produto)" class="absolute top-2 right-2 z-10"
                            :aria-label="isFavorito(produto) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
                            <svg v-if="isFavorito(produto)" xmlns="http://www.w3.org/2000/svg" fill="#ff0000"
                                viewBox="0 0 24 24" class="w-5 h-5">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-width="2"
                                viewBox="0 0 24 24" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>

                    <!-- Conteúdo -->
                    <div class="p-1 flex-1 flex flex-col">
                        <div class="flex items-center justify-between mb-1">
                            <!-- Categoria -->
                            <span class="inline-block border border-blue-200 text-blue-600 text-xs rounded px-2 py-0.5">
                                {{ categorias[produto.categoriaId] || 'Sem categoria' }}
                            </span>
                        </div>

                        <!-- Nome e descrição -->
                        <h2 class="text-sm font-semibold mb-1 truncate">{{ produto.nome }}</h2>
                        <p class="text-gray-600 text-xs line-clamp-2 mb-2">{{ produto.descricao }}</p>

                        <!-- Preço -->
                        <div class="flex items-end gap-2 mb-2">
                            <span class="text-base font-bold text-blue-600">
                                {{ formatCurrency(produto.preco) }}
                            </span>
                        </div>

                        <!-- Estoque + Carrinho -->
                        <div class="flex flex-wrap justify-between items-center gap-2 mt-auto">
                            <span class="text-xs text-gray-500">
                                {{ produto.estoque > 0 ? produto.estoque + ' em estoque' : 'Esgotado' }}
                            </span>
                            <button
                                class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center text-xs transition hover:scale-105"
                                @click="adicionarCarrinho(produto)">
                                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { adicionarCarrinho } from '/src/assets/js/cartStore.js'
import { toggleFavorito, favoritos } from '/src/assets/js/favoritoStore.js'

const produtos = ref([])
const error = ref("")
const categorias = {
  4: 'Smartphones',
  5: 'Notebooks',
  6: 'Consoles',
  7: 'Smart TVs',
  8: 'Periféricos Gamer',
  9: 'Fones de Ouvido'
}

onMounted(async () => {
    try {
        const response = await fetch("http://localhost:5101/api/Produto")
        if (!response.ok) throw new Error("Erro ao buscar produtos")
        produtos.value = await response.json()
    } catch (err) {
        error.value = "Não foi possível carregar os produtos. Tente novamente mais tarde."
    }
})

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function isFavorito(produto) {
    return favoritos.value.some(f => f.id === produto.id)
}
</script>