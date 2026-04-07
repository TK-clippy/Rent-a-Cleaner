import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Koristimo localhost da se podudara s CORS postavkama backenda
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default defineBoot(({ app }) => {
  // Postavljanje presretača (interceptor) je bolje od statičnog čitanja pri bootu
  // jer se token može promijeniti bez restarta aplikacije
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
