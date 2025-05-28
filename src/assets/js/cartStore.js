import { ref } from 'vue'

export const cart = ref([])
export const cartCount = ref(0)

export function adicionarCarrinho(produto) {
  cart.value.push(produto)
  cartCount.value++
}