import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/db.js'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Osnovna ruta za testiranje
app.get('/', (req, res) => {
  res.send('Rent-A-Cleaner API is running...')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server sluša na portu ${PORT}`)
})
