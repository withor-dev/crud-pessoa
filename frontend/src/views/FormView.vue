<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePessoaStore } from '../stores/pessoaStore'
import PessoaForm from '../components/Form.vue'
import type { Pessoa } from '../types/pessoa'

const route = useRoute()
const router = useRouter()
const store = usePessoaStore()

const pessoaToEdit = ref<Pessoa | null>(null)

onMounted(async () => {
  const id = route.params.id as string

  if (id) {
    if (store.pessoas.length === 0) {
      await store.fetchPessoas()
    }
    pessoaToEdit.value = store.pessoas.find((p) => p.id === id) || null
  }
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <PessoaForm :pessoa-to-edit="pessoaToEdit" @close="goBack" @saved="goBack" />
  </div>
</template>
