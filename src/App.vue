<script setup>
import Footer from './components/Footer.vue';
import Navbar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <div class="container mx-auto px-4 py-6">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>