import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from '../auth'
import { api } from 'boot/axios'

// Mockiramo axios (api)
vi.mock('boot/axios', () => ({
  api: {
    post: vi.fn(),
    defaults: { headers: { common: {} } }
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('login() treba uspješno spremiti korisnika i token', async () => {
    const store = useAuthStore()
    const mockUser = { id: 1, ime_prezime: 'Test', uloga: 'client' }
    const mockResponse = { data: { token: 'abc-123', ...mockUser } }
    
    api.post.mockResolvedValue(mockResponse)

    const result = await store.login({ email: 'test@test.com', lozinka: '123' })

    expect(result.success).toBe(true)
    expect(store.token).toBe('abc-123')
    expect(store.user.uloga).toBe('client')
    expect(localStorage.getItem('token')).toBe('abc-123')
    expect(JSON.parse(localStorage.getItem('user')).ime_prezime).toBe('Test')
  })

  it('logout() treba pobrisati sve podatke iz storagea i store-a', () => {
    const store = useAuthStore()
    store.token = 'stari-token'
    store.user = { id: 1 }
    localStorage.setItem('token', 'stari-token')

    store.logout()

    expect(store.token).toBe(null)
    expect(store.user).toBe(null)
    expect(localStorage.getItem('token')).toBe(null)
  })
})
