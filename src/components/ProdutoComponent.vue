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
            <div v-else
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                <div v-for="product in products" :key="product.id"
                    class="bg-white rounded shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col transition hover:scale-105 p-2 sm:p-3">
                    <!-- Imagem do produto -->
                    <div class="relative w-full aspect-[4/4] bg-white mb-2">
                        <router-link :to="`/product/${product.id}`">
                            <img :src="product.imagens?.[0] || 'https://via.placeholder.com/200x200?text=Sem+Imagem'"
                                :alt="`Imagem do produto ${product.nome}`" class="object-contain w-full h-full p-2" />
                        </router-link>

                        <!-- Ícone de favorito -->
                        <button @click="toggleFavorito(product)" class="absolute top-2 right-2 z-10"
                            :aria-label="isFavorito(product) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
                            <svg v-if="isFavorito(product)" xmlns="http://www.w3.org/2000/svg" fill="#ff0000"
                                viewBox="0 0 24 24" class="w-6 h-6">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-width="2"
                                viewBox="0 0 24 24" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>

                    <!-- Conteúdo -->
                    <div class="p-2 flex-1 flex flex-col">
                        <div class="flex items-center justify-between mb-1">
                            <!-- Categoria -->
                            <span class="inline-block border border-blue-200 text-blue-600 text-xs rounded px-2 py-0.5">
                                {{ product.categoriaId ? 'Categoria ' + product.categoriaId : 'Sem categoria' }}
                            </span>
                        </div>

                        <!-- Nome e descrição -->
                        <h2 class="text-base font-semibold mb-1 truncate">{{ product.nome }}</h2>
                        <p class="text-gray-600 text-xs line-clamp-2 mb-2">{{ product.descricao }}</p>

                        <!-- Preço -->
                        <div class="flex items-end gap-2 mb-2">
                            <span class="text-lg font-bold text-blue-600">
                                {{ formatCurrency(product.preco) }}
                            </span>
                        </div>

                        <!-- Estoque + Carrinho -->
                        <div class="flex flex-wrap justify-between items-center gap-2 mt-auto">
                            <span class="text-xs text-gray-500">
                                {{ product.estoque > 0 ? product.estoque + ' em estoque' : 'Esgotado' }}
                            </span>
                            <button
                                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center text-xs transition hover:scale-105"
                                @click="adicionarCarrinho(product)">
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
import { ref } from "vue"
import { adicionarCarrinho } from '/src/assets/js/cartStore.js'
import { toggleFavorito, favoritos } from '/src/assets/js/favoritoStore.js'

// Produtos mockados para teste visual no front-end
const products = ref([
    {
        id: 1,
        nome: "Smartphone Galaxy S24 Ultra",
        descricao: "Smartphone topo de linha com câmera de 200MP, tela AMOLED 6.8'' e 512GB.",
        preco: 7999.90,
        estoque: 25,
        categoriaId: 1,
        imagens: [
            "https://cdn.awsli.com.br/2500x2500/35/35541/produto/244145515/gs-9064_capa-dual-sense-para-samsung-galaxy-s24-ultra_1-civvmuu0ci.jpg"
        ]
    },
    {
        id: 2,
        nome: "Notebook Dell Inspiron 15",
        descricao: "Notebook com Intel Core i7, 16GB RAM, SSD 512GB, tela Full HD 15.6''.",
        preco: 4999.00,
        estoque: 10,
        categoriaId: 2,
        imagens: [
            "https://imgs.pontofrio.com.br/55066981/1g.jpg?imwidth=500"
        ]
    },
    {
        id: 3,
        nome: "Console PlayStation 5",
        descricao: "Console Sony PlayStation 5, 825GB SSD, DualSense incluso.",
        preco: 4299.99,
        estoque: 15,
        categoriaId: 3,
        imagens: [
            "https://imperiallgames.com/wp-content/uploads/2024/05/Console-PLaystation-5-Slim-Edicao-Spider-Man-2.png"
        ]
    },
    {
        id: 4,
        nome: "Smart TV LG 55'' 4K",
        descricao: "Smart TV 55 polegadas, 4K UHD, webOS, HDR, Wi-Fi.",
        preco: 3499.00,
        estoque: 8,
        categoriaId: 4,
        imagens: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTG2hAkDHwj5VzvvTwIDVVdud9Xm86hY0YBQ&s"
        ]
    },
    {
        id: 5,
        nome: "Mouse Gamer Logitech G502",
        descricao: "Mouse gamer com 11 botões programáveis, sensor HERO 25K.",
        preco: 349.90,
        estoque: 40,
        categoriaId: 5,
        imagens: [
            "https://m.media-amazon.com/images/I/61ynRhcjahL._AC_UF350,350_QL80_.jpg"
        ]
    },
    {
        id: 6,
        nome: "Fone de Ouvido JBL Tune 510BT",
        descricao: "Fone Bluetooth, bateria de até 40h, som JBL Pure Bass.",
        preco: 249.90,
        estoque: 30,
        categoriaId: 6,
        imagens: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE1N-S4r6It9Cz19-hzjKy6jbGQhJ6ZOhqw&s"
        ]
    }
])

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function isFavorito(product) {
    return favoritos.value.some(f => f.id === product.id)
}
</script>