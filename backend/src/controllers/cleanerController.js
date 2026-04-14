import db from '../config/db.js'

// GET /api/cleaners/services
export const getServices = async (req, res) => {
  try {
    const [services] = await db.execute('SELECT * FROM Services')
    res.json(services)
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri dohvaćanju usluga' })
  }
}

// GET /api/cleaners
export const getAllCleaners = async (req, res) => {
  try {
    const query = `
      SELECT
        u.id,
        u.ime_prezime,
        cp.bio,
        cp.cijena_po_satu,
        cp.prosjecna_ocjena,
        cp.ukupno_poslova, -- DODANO: Sada povlačimo podatak iz Cleaner_Profiles
        (
          SELECT GROUP_CONCAT(DISTINCT s.naziv SEPARATOR ', ')
          FROM Services s
          JOIN Bookings b ON s.id = b.service_id
          WHERE b.cleaner_id = u.id
        ) AS usluge -- Popravljeno: DISTINCT rješava duplikate koje si imao
      FROM Users u
      JOIN Cleaner_Profiles cp ON u.id = cp.user_id
      WHERE u.uloga = 'cleaner'
    `
    const [cleaners] = await db.execute(query)
    res.json(cleaners)
  } catch (error) {
    console.error(error)
    res.status(500).json({ poruka: 'Greška pri dohvaćanju čistača' })
  }
}

export const getCleanerStats = async (req, res) => {
  const userId = req.user.id // Dobivamo iz authMiddleware-a
  try {
    const [rows] = await db.execute(
      `SELECT
        COUNT(*) as ukupno_poslova,
        IFNULL(SUM(ukupna_cijena), 0) as ukupna_zarada,
        IFNULL(SUM(kvadratura * 0.2), 0) as ukupno_sati -- Okvirna procjena sati
       FROM Bookings
       WHERE cleaner_id = ? AND status = 'completed'`,
      [userId],
    )
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri dohvaćanju statistike', detalji: error.message })
  }
}

// GET /api/cleaners/profile
export const getCleanerProfile = async (req, res) => {
  const userId = req.user.id
  try {
    const [[user]] = await db.execute(
      'SELECT u.ime_prezime, u.email, u.telefon, cp.bio, cp.cijena_po_satu, cp.prosjecna_ocjena, cp.ukupno_poslova FROM Users u JOIN Cleaner_Profiles cp ON u.id = cp.user_id WHERE u.id = ?',
      [userId]
    )
    res.json(user)
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri dohvaćanju profila' })
  }
}

// PUT /api/cleaners/profile
export const updateCleanerProfile = async (req, res) => {
  const userId = req.user.id
  const { bio, cijena_po_satu, telefon } = req.body
  try {
    await db.execute('UPDATE Users SET telefon = ? WHERE id = ?', [telefon, userId])
    await db.execute('UPDATE Cleaner_Profiles SET bio = ?, cijena_po_satu = ? WHERE user_id = ?', [bio, cijena_po_satu, userId])
    res.json({ poruka: 'Profil uspješno ažuriran.' })
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri ažuriranju profila' })
  }
}

// GET /api/cleaners/calendar (Dohvaćanje smjena)
export const getAvailability = async (req, res) => {
  const userId = req.user.id
  try {
    const [rows] = await db.execute('SELECT * FROM Availability WHERE cleaner_id = ?', [userId])
    res.json(rows)
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri dohvaćanju kalendara' })
  }
}
