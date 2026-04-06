import express from 'express'
import { createBooking, getMyBookings } from '../controllers/bookingController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Sve rute ispod ovoga zahtijevaju Token
router.use(protect)

router.post('/', createBooking)
router.get('/my-bookings', getMyBookings)

export default router
