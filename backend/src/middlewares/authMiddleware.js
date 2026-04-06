import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
  let token

  // Provjera postoji li token u headeru (format: Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // Dekodiranje tokena
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Spremanje podataka o korisniku u request kako bi ih kontroleri mogli koristiti
      req.user = decoded
      next() // Pusti korisnika dalje
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      res.status(401).json({ poruka: 'Niste autorizirani, neispravan token' })
    }
  }

  if (!token) {
    res.status(401).json({ poruka: 'Niste autorizirani, token nedostaje' })
  }
}
