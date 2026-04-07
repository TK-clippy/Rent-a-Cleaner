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
        GROUP_CONCAT(s.naziv SEPARATOR ', ') AS usluge
      FROM Users u
      JOIN Cleaner_Profiles cp ON u.id = cp.user_id
      LEFT JOIN Bookings b ON u.id = b.cleaner_id
      LEFT JOIN Services s ON b.service_id = s.id
      WHERE u.uloga = 'cleaner'
      GROUP BY u.id, u.ime_prezime, cp.bio, cp.cijena_po_satu, cp.prosjecna_ocjena
    `
    const [cleaners] = await db.execute(query)
    res.json(cleaners)
  } catch (error) {
    console.error(error)
    res.status(500).json({ poruka: 'Greška pri dohvaćanju čistača' })
  }
}
