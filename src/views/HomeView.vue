<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <DestaqueComponent />
    <CategoriasComponent />
    <ProdutoComponent />
  </div>
</template>

<script setup>
import ProdutoComponent from '@/components/ProdutoComponent.vue'
import CategoriasComponent from '@/components/CategoriasComponent.vue'
import DestaqueComponent from '@/components/DestaqueComponent.vue';
</script>