import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// eslint-disable-next-line no-unused-vars
import db from './config/db.js'

// Importaj kreirane rute
import authRoutes from './routes/authRoutes.js'
import cleanerRoutes from './routes/cleanerRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

const app = express()

// --- MIDDLEWARES ---
app.use(cors())
app.use(express.json())

// Povezivanje ruta
app.use('/api/auth', authRoutes)
app.use('/api/cleaners', cleanerRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('Rent-A-Cleaner API is running...')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server sluša na portu ${PORT}`)
})
