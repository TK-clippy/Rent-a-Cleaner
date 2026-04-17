import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createBooking } from '../src/controllers/bookingController.js'
import db from '../src/config/db.js'

vi.mock('../src/config/db.js')

describe('Booking Controller - Unit Testovi', () => {
  let req, res

  beforeEach(() => {
    vi.clearAllMocks()
    // Simuliramo ulogiranog korisnika (middleware bi ovo postavio)
    req = {
      user: { id: 1 },
      body: {
        cleaner_id: '5',
        service_id: '2',
        adresa: 'Testna ulica 10',
        kvadratura: '50',
        datum_ciscenja: '2026-05-10',
        vrijeme_pocetka: '10:00:00',
        ukupna_cijena: '150.50',
        oprema_agencije: true,
        napomena: 'Pazi na psa',
      },
    }
    res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
  })

  it('treba ispravno pretvoriti tipove podataka i spremiti booking', async () => {
    db.execute.mockResolvedValue([{ insertId: 100 }])

    await createBooking(req, res)

    // Provjera jesu li stringovi postali brojevi/booleani kako zahtijeva tvoj kod
    const dbParams = db.execute.mock.calls[0][1]
    expect(typeof dbParams[1]).toBe('number') // cleaner_id
    expect(dbParams[8]).toBe(1) // oprema_agencije (true -> 1)
    expect(res.status).toHaveBeenCalledWith(201)
  })
})
