import { Router } from 'express'
import * as chatCtrl from '../controllers/chat.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/results', checkAuth, chatCtrl.getResults)

export { router }