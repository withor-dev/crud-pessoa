import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    console.log(error.response)
    if (error.response && error.response.data) {
      const data = error.response.data

      if (data.messages && Array.isArray(data.messages)) {
        return Promise.reject(data.messages)
      }
    }

    return Promise.reject([
      'Não foi possível conectar ao servidor. Verifique se a API está rodando.',
    ])
  },
)

export default api
