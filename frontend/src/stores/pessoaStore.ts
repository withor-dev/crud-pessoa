import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Pessoa, CreatePessoaDTO, UpdatePessoaDTO } from '@/types/pessoa'

export const usePessoaStore = defineStore('pessoa', () => {
  const pessoas = ref<Pessoa[]>([])
  const isLoading = ref(false)
  const errors = ref<string[]>([])

  const clearErrors = () => {
    errors.value = []
  }

  const fetchPessoas = async () => {
    isLoading.value = true
    clearErrors()
    try {
      const response = await api.get<Pessoa[]>('/pessoa')
      pessoas.value = response.data
    } catch (err) {
      errors.value = err as string[]
    } finally {
      isLoading.value = false
    }
  }

  const createPessoa = async (data: CreatePessoaDTO) => {
    isLoading.value = true
    clearErrors()
    try {
      await api.post('/pessoa', data)
      await fetchPessoas()
      return true
    } catch (err) {
      errors.value = err as string[]
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updatePessoa = async (id: string, data: UpdatePessoaDTO) => {
    isLoading.value = true
    clearErrors()
    try {
      await api.patch(`/pessoa/${id}`, data)
      await fetchPessoas()
      return true
    } catch (err) {
      errors.value = err as string[]
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deletePessoa = async (id: string) => {
    isLoading.value = true
    clearErrors()
    try {
      await api.delete(`/pessoa/${id}`)
      await fetchPessoas()
    } catch (err) {
      errors.value = err as string[]
    } finally {
      isLoading.value = false
    }
  }

  return {
    pessoas,
    isLoading,
    errors,
    clearErrors,
    fetchPessoas,
    createPessoa,
    updatePessoa,
    deletePessoa,
  }
})
