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
