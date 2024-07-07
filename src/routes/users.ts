import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.get('/users', controllers.users.userById)

export default router