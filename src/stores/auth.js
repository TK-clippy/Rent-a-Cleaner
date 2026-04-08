import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => {
    // SIGURNO DO dohvaćanje korisnika
    let user = null
    try {
      const savedUser = localStorage.getItem('user')
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        user = JSON.parse(savedUser)
      }
    } catch (e) {
      console.error('Greška pri čitanju korisnika iz storagea:', e)
      localStorage.removeItem('user')
    }

    return {
      user: user,
      token: localStorage.getItem('token') || null,
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.uloga || null,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        console.log('BACKEND ODGOVOR:', response.data) // Ovo će nam reći sve

        // Pokušavamo izvući token i user, čak i ako se polja zovu drugačije
        const token = response.data.token
        const user = response.data.user || response.data.korisnik || response.data

        // Ako nemamo token, tek onda bacamo grešku
        if (!token) {
          throw new Error('Server nije vratio token.')
        }

        this.token = token
        this.user = user

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return { success: true, uloga: user.uloga }
      } catch (error) {
        console.error('Login Action Error:', error)
        return {
          success: false,
          message: error.response?.data?.poruka || error.message || 'Greška pri prijavi',
        }
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete api.defaults.headers.common['Authorization']
    },
  },
})
