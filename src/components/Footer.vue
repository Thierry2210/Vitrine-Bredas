<template>
  <footer class="bg-sky-700 text-white py-4 px-8 flex justify-between items-center">
    <a href="https://github.com/Thierry2210" target="_blank" rel="noopener noreferrer"
      @click.prevent="socialAlert('GitHub')" class="flex flex-col items-center">
      <img src="@/assets/img/github.png" alt="GitHub" class="w-8 h-8" />
      <p>Github</p>
    </a>
    <a href="https://www.linkedin.com/in/matheus-thierry-4512842b3/" target="_blank" rel="noopener noreferrer"
      @click.prevent="socialAlert('LinkedIn')" class="flex flex-col items-center">
      <img src="@/assets/img/linkedin.png" alt="LinkedIn" class="w-8 h-8" />
      <p>Linkedin</p>
    </a>
    <a href="https://www.instagram.com/mthierry_/" target="_blank" rel="noopener noreferrer"
      @click.prevent="socialAlert('Instagram')" class="flex flex-col items-center">
      <img src="@/assets/img/instagram.png" alt="Instagram" class="w-8 h-8" />
      <p>Instagram</p>
    </a>
  </footer>
</template>

<script setup>
function socialAlert(platform) {
  alert(`Você está sendo redirecionado para o ${platform}.`);
  if (platform === 'GitHub') {
    window.open('https://github.com/Thierry2210', '_blank');
  } else if (platform === 'LinkedIn') {
    window.open('https://www.linkedin.com/in/matheus-thierry-4512842b3/', '_blank');
  } else if (platform === 'Instagram') {
    window.open('https://www.instagram.com/mthierry_/', '_blank');
  }
}
</script>