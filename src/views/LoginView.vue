<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Entrar na sua conta</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm mb-1" for="email">E-mail</label>
                    <input v-model="email" id="email" type="email" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="seu@email.com" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm mb-1" for="password">Senha</label>
                    <input v-model="password" id="password" type="password" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Sua senha" />
                </div>
                <router-link to="/">
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
                        Entrar
                    </button>
                </router-link>
            </form>
            <div class="mt-4 text-center">
                <a href="#" class="text-blue-500 hover:underline text-sm">Esqueceu a senha?</a>
            </div>
            <div class="mt-2 text-center text-sm text-gray-500">
                Não tem conta?
                <a href="register" class="text-blue-500 hover:underline">Cadastre-se</a>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function login() {
    // Aqui você pode colocar sua lógica de autenticação
    alert(`Login de: ${email.value}`)
}
</script>