import express from 'express'
import { getServices, getAllCleaners } from '../controllers/cleanerController.js'

const router = express.Router()

router.get('/', getAllCleaners)
router.get('/services', getServices)

export default router
