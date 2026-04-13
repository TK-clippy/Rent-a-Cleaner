import db from '../config/db.js'

// Middleware za provjeru je li korisnik admin (možeš ovo prebaciti u middlewares folder kasnije)
export const provjeriAdmina = (req, res, next) => {
  if (req.user && req.user.uloga === 'admin') {
    next()
  } else {
    res.status(403).json({ poruka: 'Pristup odbijen. Samo za administratore.' })
  }
}

// GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const [[usersCount]] = await db.execute('SELECT COUNT(*) as total FROM Users WHERE uloga = "client"')
    const [[cleanersCount]] = await db.execute('SELECT COUNT(*) as total FROM Users WHERE uloga = "cleaner"')
    const [[bookingsCount]] = await db.execute('SELECT COUNT(*) as total FROM Bookings')

    res.json({
      klijenti: usersCount.total,
      cistaci: cleanersCount.total,
      rezervacije: bookingsCount.total
    })
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri učitavanju statistike.' })
  }
}

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute('SELECT id, ime_prezime, email, telefon, uloga FROM Users ORDER BY uloga ASC')
    res.json(users)
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri učitavanju korisnika.' })
  }
}

// GET /api/admin/metrics
export const getMetrics = async (req, res) => {
  try {
    // 1. Ukupni promet - promijenjeno na "Završeno"
    const [[prihod]] = await db.execute(
      'SELECT COALESCE(SUM(ukupna_cijena), 0) as ukupno FROM Bookings WHERE status = "Završeno"'
    )

    // 2. Top čistači - promijenjeno na "Završeno"
    const [topCistaci] = await db.execute(`
      SELECT u.ime_prezime, COUNT(b.id) as poslova, COALESCE(SUM(b.ukupna_cijena * 0.8), 0) as zarada
      FROM Bookings b
      JOIN Users u ON b.cleaner_id = u.id
      WHERE b.status = "Završeno"
      GROUP BY b.cleaner_id
      ORDER BY poslova DESC
      LIMIT 5
    `)

    // 3. Popularne usluge (ovdje status obično nije bitan, ali možeš dodati ako želiš samo završene)
    const [popularneUsluge] = await db.execute(`
      SELECT s.naziv, COUNT(b.id) as broj
      FROM Bookings b
      JOIN Services s ON b.service_id = s.id
      WHERE b.status = "Završeno"
      GROUP BY b.service_id
      ORDER BY broj DESC
    `)

    const ukupno = Number(prihod.ukupno)

    res.json({
      ukupniPromet: ukupno,
      provizija: (ukupno * 0.2).toFixed(2),
      isplateCistacima: (ukupno * 0.8).toFixed(2),
      topCistaci,
      popularneUsluge,
    })
  } catch (error) {
    console.error('Greška u metrics kontroleru:', error)
    res.status(500).json({ poruka: 'Greška pri učitavanju metrika.' })
  }
}
// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    // Brisanje korisnika (zbog ON DELETE CASCADE u bazi, obrisat će se i profil i rezervacije)
    await db.execute('DELETE FROM Users WHERE id = ?', [userId])
    res.json({ poruka: 'Korisnik uspješno obrisan.' })
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri brisanju korisnika.' })
  }
}
