<template>
    <!-- Categorias -->
    <section
        class="pt-8 px-2 sm:px-4 md:px-10 py-14 sm:py-16 text-center rounded-2xl mb-10">
        <div class="flex flex-col items-center justify-center mb-8 gap-2">
            <h2 class="text-3xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-lg tracking-tight">
                Compre nas <span class="text-blue-500 underline decoration-4 decoration-blue-300">Melhores
                    Categorias</span>
            </h2>
            <p class="text-lg sm:text-2xl text-gray-700 mt-2 font-medium">
                Encontre tudo o que você procura com um clique!
            </p>
        </div>
        <div
            class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 sm:gap-10 md:gap-14 justify-items-center">
            <div v-for="category in categories" :key="category.name"
                class="text-center flex flex-col items-center justify-center group">
                <div
                    class="w-28 h-28 sm:w-36 sm:h-36 mb-3 sm:mb-6 bg-white border-4 border-blue-200 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-blue-400 transition-all duration-200 cursor-pointer">
                    <img :src="category.icon" :alt="category.name"
                        class="w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-md" />
                </div>
                <p class="text-base sm:text-xl font-bold text-blue-700 group-hover:text-blue-900 transition">
                    {{ category.name }}
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
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