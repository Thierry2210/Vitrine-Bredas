<script setup>
import Footer from './components/FooterComponent.vue';
import Navbar from './components/NavBarComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white to blue-100 flex flex-col">
    <Navbar />
    <router-view class="flex-1"></router-view>
    <Footer />
  </div>
  <!-- WhatsApp -->
  <div class="whatsapp">
    <a id="whatsapp" href="https://wa.me/5514996418461?text=Olá, poderia me ajudar?" target="_blank"
      class="fixed w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] bottom-4 sm:bottom-10 right-4 sm:right-10 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg z-50">
      <i class="bi bi-whatsapp">
        <img src="/src/assets/img/whatsapp.png" alt="" class="justify-center h-8 w-8 sm:h-10 sm:w-10" />
      </i>
    </a>
  </div>
</template>