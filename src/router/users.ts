import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.get('/', controllers.users.getUsers)
router.get('/:id', controllers.users.userById)

export default router