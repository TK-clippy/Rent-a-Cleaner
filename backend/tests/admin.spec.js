import { describe, it, expect, vi } from 'vitest'
import { getMetrics } from '../src/controllers/adminController.js'
import db from '../src/config/db.js'

vi.mock('../src/config/db.js')

describe('Admin Controller - Unit Testovi', () => {
  it('treba ispravno izračunati provizije i isplate iz ukupnog prometa', async () => {
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }

    // Simuliramo promet od 1000 EUR
    db.execute.mockResolvedValueOnce([[{ ukupno: 1000 }]]) // prihod
    db.execute.mockResolvedValueOnce([[]]) // topCistaci
    db.execute.mockResolvedValueOnce([[]]) // popularneUsluge

    await getMetrics({}, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ukupniPromet: 1000,
        provizija: '200.00', // 20%
        isplateCistacima: '800.00', // 80%
      }),
    )
  })
})
