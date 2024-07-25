import express from 'express'
import controllers from '../controllers'
import { verifyToken } from '../helpers/authenticate'

const router = express.Router()

router.post('/login', verifyToken, controllers.auth.login)
router.post('/register', controllers.auth.register)

export default router