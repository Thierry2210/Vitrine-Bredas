<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Criar nova conta</h2>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm mb-1" for="name">Nome</label>
                    <input v-model="name" id="name" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Seu nome completo" />
                </div>
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
                        placeholder="Crie uma senha" />
                </div>
                <router-link to="/">
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
                        Cadastrar
                    </button>
                </router-link>
            </form>
            <div class="mt-4 text-center text-sm text-gray-500">
                Já tem conta?
                <router-link to="/login" class="text-blue-500 hover:underline">Entrar</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

function register() {
    // Lógica de cadastro aqui
    alert(`Cadastro de: ${name.value} (${email.value})`)
}
</script>