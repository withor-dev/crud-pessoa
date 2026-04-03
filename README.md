# 👥 Gestão de Pessoas - Full-Stack CRUD

Este projeto é uma aplicação Full-Stack para cadastro e gestão de pessoas, construída com foco em **Clean Architecture, Componentização, Design Patterns e facilidade de execução**. 

Ele serve como uma demonstração técnica de uma arquitetura moderna, escalável e pronta para produção.

---

## 🚀 Stack Tecnológica

O projeto foi construído utilizando o "estado da arte" das ferramentas do ecossistema JavaScript/TypeScript:

### Back-end (API REST / BFF)
* **Framework:** [NestJS](https://nestjs.com/) (Node.js + TypeScript).
* **Banco de Dados:** PostgreSQL.
* **ORM:** [Prisma ORM](https://www.prisma.io/) (Garantindo tipagem estrita de ponta a ponta).
* **Validação:** `class-validator` e `class-transformer` (Com algoritmo customizado para validação matemática de CPF e proteção contra *Mass Assignment*).
* **Tratamento de Erros:** Filtros de exceção globais (`ExceptionFilter`) para padronizar as respostas de erro HTTP.

### Front-end (SPA)
* **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API / `<script setup>`) inicializado via [Vite](https://vitejs.dev/).
* **Roteamento:** Vue Router v4 (Garantindo suporte a *Deep Linking* e URLs independentes).
* **Gerenciamento de Estado:** Pinia (Setup Syntax).
* **Estilização:** Tailwind CSS v4 (Design responsivo e focado em utilitários, sem CSS morto).
* **Cliente HTTP:** Axios com *Interceptors* globais para captura e tratamento centralizado de erros da API.

### Infraestrutura
* **Docker & Docker Compose** (Provisionamento automatizado do banco de dados).

---

## ⚙️ Decisões Arquiteturais e Boas Práticas

1. **BFF (Backend for Frontend):** O backend não retorna erros "crus" do banco de dados. Ele intercepta as exceções (ex: E-mail ou CPF duplicados) e formata um *payload* padronizado contendo um array de `messages`, facilitando o consumo e a exibição de alertas pelo Front-end.
2. **Navegação Dinâmica (Deep Linking):** Em vez de utilizar modais ou renderização condicional simples, o CRUD foi dividido em rotas (`/` para listagem e `/editar/:id` para edição). Isso permite o compartilhamento de URLs diretas, essencial para sistemas corporativos e arquiteturas de Microfrontends.
3. **Reusabilidade de Componentes:** O formulário de cadastro (`PersonForm.vue`) compartilha exatamente a mesma estrutura para as operações de **Criação (POST)** e **Edição (PATCH)** aplicando o conceito de *Data Down, Actions Up*.
4. **Segurança no Payload:** O backend utiliza validação com `forbidNonWhitelisted: true`, rejeitando qualquer requisição que tente injetar dados sensíveis (como IDs ou datas de criação) durante a atualização (*Mass Assignment*).

---

## 📂 Estrutura do Repositório

O projeto adota uma estrutura consolidada para facilitar a avaliação, dividida em dois ecossistemas principais:

```text
📁 crud-pessoa/
 ├── 📁 backend/       # API NestJS
 ├── 📁 frontend/      # SPA Vue 3
 └── 📄 README.md      # Documentação central
