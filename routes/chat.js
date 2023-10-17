import { Router } from 'express'
import * as chatCtrl from '../controllers/chat.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========

router.post('/', chatCtrl.create)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// router.post('/', checkAuth, chatCtrl.create)


export { router }