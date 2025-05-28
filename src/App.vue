<script setup>
import Footer from './components/Footer.vue';
import Navbar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
    <router-view class="flex-1"></router-view>
    <Footer />
  </div>
</template>