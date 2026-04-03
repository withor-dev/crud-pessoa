<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePessoaStore } from '@/stores/pessoaStore'
import type { Pessoa, CreatePessoaDTO } from '@/types/pessoa'

const props = defineProps<{
  pessoaToEdit?: Pessoa | null
}>()
const emit = defineEmits(['close', 'saved'])
const store = usePessoaStore()

const formData = ref<CreatePessoaDTO>({
  fullName: '',
  email: '',
  cpf: '',
  birthDate: '',
  phone: '',
})

watch(
  () => props.pessoaToEdit,
  (newVal) => {
    store.clearErrors()
    if (newVal) {
      const formattedDate = new Date(newVal.birthDate).toISOString().split('T')[0]
      formData.value = { ...newVal, birthDate: formattedDate }
    } else {
      formData.value = { fullName: '', email: '', cpf: '', birthDate: '', phone: '' }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  let success = false

  const payloadToSave = {
    fullName: formData.value.fullName,
    email: formData.value.email,
    cpf: formData.value.cpf,
    birthDate: formData.value.birthDate,
    phone: formData.value.phone,
  }

  if (props.pessoaToEdit?.id) {
    success = await store.updatePessoa(props.pessoaToEdit.id, payloadToSave)
  } else {
    success = await store.createPessoa(payloadToSave)
  }

  if (success) {
    emit('saved')
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      {{ props.pessoaToEdit ? 'Editar Cadastro' : 'Nova Pessoa' }}
    </h2>

    <div
      v-if="store.errors.length > 0"
      class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700"
    >
      <p class="font-bold mb-1">Atenção:</p>
      <ul class="list-disc pl-5">
        <li v-for="(error, index) in store.errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
        <input
          v-model="formData.fullName"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ex: João da Silva"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ex: joao@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CPF (Somente Números)</label>
          <input
            v-model="formData.cpf"
            type="text"
            required
            maxlength="11"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ex: 12345678900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
          <input
            v-model="formData.birthDate"
            type="date"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input
            v-model="formData.phone"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ex: 41999999999"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          :disabled="store.isLoading"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          :disabled="store.isLoading"
        >
          <span v-if="store.isLoading">Salvando...</span>
          <span v-else>Salvar Cadastro</span>
        </button>
      </div>
    </form>
  </div>
</template>
