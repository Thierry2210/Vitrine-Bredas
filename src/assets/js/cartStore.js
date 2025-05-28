import { ref } from 'vue'

export const cart = ref([])

export function adicionarCarrinho(produto) {
  const found = cart.value.find(item => item.idProduto === produto.idProduto)
  if (found) {
    found.quantity = (found.quantity || 1) + 1
  } else {
    cart.value.push({ ...produto, quantity: 1 })
  }
}

export function removerCarrinho(index) {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--
  } else {
    cart.value.splice(index, 1)
  }
}