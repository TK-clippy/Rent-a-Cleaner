import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loginUser, registerUser } from '../src/controllers/authController.js'
import db from '../src/config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// 1. Mockiramo sve vanjske ovisnosti
vi.mock('../src/config/db.js')
vi.mock('bcryptjs')
vi.mock('jsonwebtoken')

describe('Auth Controller - Unit Testovi', () => {
  let req, res

  beforeEach(() => {
    vi.clearAllMocks()
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
  })

  // TEST ZA LOGIN
  describe('loginUser', () => {
    it('treba uspješno ulogirati korisnika i vratiti token', async () => {
      req = { body: { email: 'test@user.com', lozinka: 'lozinka123' } }

      db.execute.mockResolvedValue([
        [
          {
            id: 1,
            ime_prezime: 'Testko',
            email: 'test@user.com',
            uloga: 'client',
            lozinka_hash: 'hash',
          },
        ],
      ])

      bcrypt.compare.mockResolvedValue(true)
      jwt.sign.mockReturnValue('lazni_jwt_token')

      await loginUser(req, res)

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: 'lazni_jwt_token',
        }),
      )
    })

    it('treba odbiti login ako je lozinka kriva', async () => {
      req = { body: { email: 'test@user.com', lozinka: 'pogresna' } }

      db.execute.mockResolvedValue([[{ lozinka_hash: 'hash' }]])
      bcrypt.compare.mockResolvedValue(false)

      await loginUser(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ poruka: 'Neispravan email ili lozinka' })
    })
  })

  // TEST ZA REGISTRACIJU
  describe('registerUser', () => {
    it('treba kreirati novog korisnika i vratiti 201', async () => {
      req = {
        body: {
          ime_prezime: 'Novi Korisnik',
          email: 'novi@test.com',
          lozinka: '123',
          uloga: 'client',
        },
      }

      // Simuliramo da email ne postoji
      db.execute.mockResolvedValueOnce([[]])
      // Simuliramo uspješan INSERT
      db.execute.mockResolvedValueOnce([{ insertId: 10 }])

      bcrypt.genSalt.mockResolvedValue('salt')
      bcrypt.hash.mockResolvedValue('hash')
      jwt.sign.mockReturnValue('token_novi')

      await registerUser(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 10,
          email: 'novi@test.com',
        }),
      )
    })
  })
})
