import db from '../config/db.js'

// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  const userId = req.user.id
  try {
    const [[user]] = await db.execute(
      'SELECT id, ime_prezime, email, telefon FROM Users WHERE id = ?',
      [userId]
    )
    res.json(user)
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri dohvaćanju profila' })
  }
}

// PUT /api/users/profile
export const updateUserProfile = async (req, res) => {
  const userId = req.user.id
  const { ime_prezime, telefon } = req.body
  try {
    await db.execute('UPDATE Users SET ime_prezime = ?, telefon = ? WHERE id = ?', [ime_prezime, telefon, userId])
    res.json({ poruka: 'Profil uspješno ažuriran.' })
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri ažuriranju profila' })
  }
}
