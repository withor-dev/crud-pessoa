<script setup lang="ts">
import { usePessoaStore } from '@/stores/pessoaStore'
import type { Pessoa } from '@/types/pessoa'

const emit = defineEmits<{
  (e: 'edit', pessoa: Pessoa): void
}>()

const store = usePessoaStore()

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const userTimezoneOffset = date.getTimezoneOffset() * 60000
  const correctedDate = new Date(date.getTime() + userTimezoneOffset)
  return correctedDate.toLocaleDateString('pt-BR')
}

const handleDelete = async (id: string, name: string) => {
  if (window.confirm(`Tem certeza que deseja excluir o cadastro de ${name}?`)) {
    await store.deletePessoa(id)
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
    <div v-if="store.isLoading" class="p-8 text-center text-gray-500">
      <p class="text-lg animate-pulse">Carregando dados...</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="bg-gray-50 border-b border-gray-200 text-gray-700 text-sm uppercase tracking-wider"
          >
            <th class="p-4 font-semibold">Nome</th>
            <th class="p-4 font-semibold">E-mail</th>
            <th class="p-4 font-semibold text-center">CPF</th>
            <th class="p-4 font-semibold text-center">Nascimento</th>
            <th class="p-4 font-semibold text-center">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="store?.pessoas?.length === 0">
            <td colspan="5" class="p-8 text-center text-gray-500">
              Nenhuma pessoa cadastrada ainda.
            </td>
          </tr>
          <tr
            v-for="pessoa in store.pessoas"
            :key="pessoa.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="p-4 text-gray-800 font-medium">{{ pessoa.fullName }}</td>
            <td class="p-4 text-gray-600">{{ pessoa.email }}</td>
            <td class="p-4 text-gray-600 text-center">{{ pessoa.cpf }}</td>
            <td class="p-4 text-gray-600 text-center">{{ formatDate(pessoa.birthDate) }}</td>
            <td class="p-4 flex justify-center gap-2">
              <button
                @click="emit('edit', pessoa)"
                class="px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors text-sm font-medium"
              >
                Editar
              </button>
              <button
                @click="handleDelete(pessoa.id, pessoa.fullName)"
                class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
