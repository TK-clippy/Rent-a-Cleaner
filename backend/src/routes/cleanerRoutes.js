import express from 'express'
import {
  getServices,
  getAllCleaners,
  getCleanerStats,
  getAvailability,
} from '../controllers/cleanerController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getAllCleaners)
router.get('/services', getServices)
router.get('/stats', protect, getCleanerStats)
router.get('/calendar', protect, getAvailability)

export default router
