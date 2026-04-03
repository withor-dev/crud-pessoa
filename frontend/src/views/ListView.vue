<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePessoaStore } from '../stores/pessoaStore'
import PessoaTable from '../components/Table.vue'
import type { Pessoa } from '../types/pessoa'

const store = usePessoaStore()
const router = useRouter()

onMounted(() => {
  store.fetchPessoas()
})

const navigateToEdit = (pessoa: Pessoa) => {
  router.push(`/editar/${pessoa.id}`)
}

const navigateToNew = () => {
  router.push('/novo')
}
</script>

<template>
  <div class="space-y-6">
    <header
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Gestão de Pessoas</h1>
        <p class="text-gray-500 mt-1">CRUD de Pessoas</p>
      </div>
      <button
        @click="navigateToNew"
        class="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all"
      >
        + Novo Cadastro
      </button>
    </header>

    <PessoaTable @edit="navigateToEdit" />
  </div>
</template>
