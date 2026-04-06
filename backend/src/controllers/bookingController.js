import db from '../config/db.js'

// POST /api/bookings
// Kreiranje nove rezervacije (Zaštićena ruta)
export const createBooking = async (req, res) => {
  const {
    cleaner_id,
    service_id,
    adresa,
    kvadratura,
    datum_ciscenja,
    vrijeme_pocetka,
    ukupna_cijena,
    oprema_agencije,
  } = req.body
  const client_id = req.user.id // Dobivamo iz JWT tokena (authMiddleware)

  try {
    const [result] = await db.execute(
      `INSERT INTO Bookings
      (client_id, cleaner_id, service_id, adresa, kvadratura, datum_ciscenja, vrijeme_pocetka, ukupna_cijena, oprema_agencije)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client_id,
        cleaner_id,
        service_id,
        adresa,
        kvadratura,
        datum_ciscenja,
        vrijeme_pocetka,
        ukupna_cijena,
        oprema_agencije,
      ],
    )

    res.status(201).json({ poruka: 'Rezervacija uspješno kreirana', bookingId: result.insertId })
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri kreiranju rezervacije', detalji: error.message })
  }
}

// GET /api/bookings/my-bookings
// Dohvaćanje rezervacija za trenutno prijavljenog korisnika
export const getMyBookings = async (req, res) => {
  const userId = req.user.id
  const rola = req.user.uloga

  try {
    // Ako je klijent gleda svoje narudžbe, ako je čistač gleda svoje zadatke
    const columnToMatch = rola === 'cleaner' ? 'cleaner_id' : 'client_id'

    const query = `
      SELECT b.*, s.naziv as usluga, u.ime_prezime as druga_strana
      FROM Bookings b
      JOIN Services s ON b.service_id = s.id
      JOIN Users u ON ${rola === 'cleaner' ? 'b.client_id = u.id' : 'b.cleaner_id = u.id'}
      WHERE b.${columnToMatch} = ?
      ORDER BY b.datum_ciscenja DESC
    `

    const [bookings] = await db.execute(query, [userId])
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri dohvaćanju rezervacija', detalji: error.message })
  }
}
