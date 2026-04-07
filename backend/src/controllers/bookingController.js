import db from '../config/db.js'

// 1. KREIRANJE REZERVACIJE
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
  const client_id = req.user.id

  try {
    const [result] = await db.execute(
      `INSERT INTO Bookings
      (client_id, cleaner_id, service_id, adresa, kvadratura, datum_ciscenja, vrijeme_pocetka, ukupna_cijena, oprema_agencije, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Na čekanju')`,
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
    res.status(500).json({ poruka: 'Greška pri kreiranju', detalji: error.message })
  }
}

// 2. DOHVAĆANJE MOJIH REZERVACIJA (Popravljeno s JOIN-om)
export const getMyBookings = async (req, res) => {
  const userId = req.user.id
  const rola = req.user.uloga

  try {
    let query = ''
    if (rola === 'cleaner') {
      // Dodani klijent_email i klijent_telefon
      query = `
        SELECT
          b.*,
          s.naziv as usluga_ime,
          u.ime_prezime as klijent_ime,
          u.email as klijent_email,
          u.telefon as klijent_telefon
        FROM Bookings b
        JOIN Services s ON b.service_id = s.id
        JOIN Users u ON b.client_id = u.id
        JOIN Cleaner_Profiles cp ON b.cleaner_id = cp.user_id
        WHERE cp.user_id = ?
        ORDER BY b.datum_ciscenja DESC
      `
    } else {
      // Dodani cistac_email i cistac_telefon
      query = `
        SELECT
          b.*,
          s.naziv as usluga_ime,
          u.ime_prezime as cistac_ime,
          u.email as cistac_email,
          u.telefon as cistac_telefon
        FROM Bookings b
        LEFT JOIN Services s ON b.service_id = s.id
        LEFT JOIN Cleaner_Profiles cp ON b.cleaner_id = cp.user_id
        LEFT JOIN Users u ON cp.user_id = u.id
        WHERE b.client_id = ?
        ORDER BY b.datum_ciscenja DESC
      `
    }

    const [rows] = await db.execute(query, [userId])
    res.json(rows)
  } catch (error) {
    res.status(500).json({ poruka: 'Greška u bazi', detalji: error.message })
  }
}

// 3. OTKAZIVANJE REZERVACIJE
export const cancelBooking = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  try {
    // Koristimo 'Otkazano' da odgovara tvom UI-u i bazi
    await db.execute(`UPDATE Bookings SET status = 'Otkazano' WHERE id = ? AND client_id = ?`, [
      id,
      userId,
    ])
    res.json({ poruka: 'Rezervacija otkazana' })
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri otkazivanju', detalji: error.message })
  }
}
