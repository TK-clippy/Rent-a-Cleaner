import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { provjeriAdmina, getAdminStats, getAllUsers, deleteUser } from '../controllers/adminController.js'

const router = express.Router()

// Sve rute ispod moraju proći prvo login (protect), pa onda provjeru uloge (provjeriAdmina)
router.use(protect, provjeriAdmina)

router.get('/stats', getAdminStats)
router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)

export default router
