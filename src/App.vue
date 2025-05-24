<script setup>
import Navbar from './components/NavbarComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <div class="container mx-auto px-4 py-6">
      <router-view></router-view>
    </div>
  </div>
</template>