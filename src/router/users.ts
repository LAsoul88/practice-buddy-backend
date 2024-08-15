import express from 'express'
import controllers from '../controllers'
import { authenticate } from '../helpers/authenticate'

const router = express.Router()

router.get('/', authenticate, controllers.users.getUsers)
router.get('/:id', authenticate, controllers.users.userById)
router.delete('/', authenticate, controllers.users.deleteUsers)

export default router