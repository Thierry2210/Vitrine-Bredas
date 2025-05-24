<template>
  <footer class="bg-white text-black pt-8 pb-8 mt-auto shadow-mt border-t">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row text-center md:text-left justify-between">
        <div class="mb-6 md:mb-0 md:w-1/3 flex flex-col items-center md:items-start">
          <img src="@/assets/img/logo-bredas.svg" alt="Logo Bredas" width="130" class="mb-2 transition-all duration-300 hover:scale-105" />
          <p class="text-xs">&copy; 2025 Bredas. Todos os direitos reservados.</p>
        </div>
        <div class="mb-6 md:mb-0 md:w-1/3 flex flex-col items-center md:items-start">
          <h6 class="font-bold mb-2">Fale conosco</h6>
          <p class="text-xs mb-1 flex items-center">
            <i class="bi bi-whatsapp text-green-500 mr-1"></i> Whatsapp:
          </p>
          <a href="https://wa.me/5514996418461" class="text-black no-underline hover:underline" target="_blank" rel="noopener">
            (14) 99641-8461
          </a>
        </div>
        <div class="md:w-1/3 flex flex-col items-center md:items-start">
          <h6 class="font-bold mb-2">Links úteis</h6>
          <ul class="list-none space-y-1">
            <li>
              <router-link to="/sobre" class="text-black no-underline hover:underline">Sobre nós</router-link>
            </li>
            <li>
              <router-link to="/contato" class="text-black no-underline hover:underline">Contato</router-link>
            </li>
            <li>
              <router-link to="/politica-de-privacidade" class="text-black no-underline hover:underline">
                Política de Privacidade
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>