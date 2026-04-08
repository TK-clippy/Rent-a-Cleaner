import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../config/db.js'

// Generiranje JWT tokena
const generateToken = (id, uloga) => {
  return jwt.sign({ id, uloga }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// POST /api/auth/register
export const registerUser = async (req, res) => {
  const { ime_prezime, email, lozinka, telefon, uloga } = req.body

  try {
    const [existingUsers] = await db.execute('SELECT email FROM Users WHERE email = ?', [email])
    if (existingUsers.length > 0) {
      return res.status(400).json({ poruka: 'Korisnik s ovim emailom već postoji.' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(lozinka, salt)

    // POPRAVAK: Dozvoljavamo admina, fallback je client
    const allowedRoles = ['client', 'cleaner', 'admin']
    const rola = allowedRoles.includes(uloga) ? uloga : 'client'

    // POPRAVAK: Zaštita od undefined vrijednosti
    const siguranTelefon = telefon || null

    const [result] = await db.execute(
      'INSERT INTO Users (ime_prezime, email, lozinka_hash, telefon, uloga) VALUES (?, ?, ?, ?, ?)',
      [ime_prezime, email, hashedPassword, siguranTelefon, rola],
    )

    const newUserId = result.insertId

    if (rola === 'cleaner') {
      await db.execute('INSERT INTO Cleaner_Profiles (user_id) VALUES (?)', [newUserId])
    }

    res.status(201).json({
      id: newUserId,
      ime_prezime,
      email,
      uloga: rola,
      token: generateToken(newUserId, rola),
    })
  } catch (error) {
    res.status(500).json({ poruka: 'Greška na serveru', detalji: error.message })
  }
}

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, lozinka } = req.body

  try {
    // 1. Pronađi korisnika po emailu
    const [users] = await db.execute('SELECT * FROM Users WHERE email = ?', [email])
    const user = users[0]

    // 2. Usporedi poslanu lozinku s hashem iz baze
    if (user && (await bcrypt.compare(lozinka, user.lozinka_hash))) {
      res.json({
        id: user.id,
        ime_prezime: user.ime_prezime,
        email: user.email,
        uloga: user.uloga,
        token: generateToken(user.id, user.uloga),
      })
    } else {
      res.status(401).json({ poruka: 'Neispravan email ili lozinka' })
    }
  } catch (error) {
    res.status(500).json({ poruka: 'Greška na serveru', detalji: error.message })
  }
}
