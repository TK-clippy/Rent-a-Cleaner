import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Testiranje konekcije
pool
  .getConnection()
  .then((conn) => {
    console.log('Uspješno povezan s MySQL bazom')
    conn.release()
  })
  .catch((err) => {
    console.error('Greška pri povezivanju s bazom:', err.message)
  })

export default pool
