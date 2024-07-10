import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.post('/login', controllers.auth.login)
router.post('/register', controllers.auth.register)

export default router