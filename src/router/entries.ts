import express from 'express'
import controllers from '../controllers'
import { verifyToken } from '../helpers/authenticate'

const router = express.Router()

router.get('/', verifyToken, controllers.entries.entriesByUser)
router.post('/', verifyToken, controllers.entries.createEntry)
router.delete('/', controllers.entries.deleteEntries)

export default router