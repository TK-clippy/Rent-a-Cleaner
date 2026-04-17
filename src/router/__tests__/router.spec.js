import { describe, it, expect } from 'vitest'
import routes from '../routes'

describe('Router putanje', () => {
  it('treba sadržavati definicije za sve tri uloge', () => {
    const paths = routes.map(r => r.path)
    
    expect(paths).toContain('/client')
    expect(paths).toContain('/cleaner')
    expect(paths).toContain('/admin')
  })

  it('root putanja (/) treba preusmjeriti na login', () => {
    const rootRoute = routes.find(r => r.path === '/')
    expect(rootRoute.redirect).toBe('/auth/login')
  })

  it('admin ruta treba imati metrics pod-rutu', () => {
    const adminRoute = routes.find(r => r.path === '/admin')
    const metrics = adminRoute.children.find(c => c.path === 'metrics')
    expect(metrics).toBeDefined()
  })
})
