// Arquivo: src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import FormView from '../views/FormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListView,
    },
    {
      path: '/novo',
      name: 'novo',
      component: FormView,
    },
    {
      path: '/editar/:id',
      name: 'editar',
      component: FormView,
    },
  ],
})

export default router
