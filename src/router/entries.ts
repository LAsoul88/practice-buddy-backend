import express from 'express'
import controllers from '../controllers'
import { authenticate } from '../helpers/authenticate'

const router = express.Router()

router.get('/:id', authenticate, controllers.entries.entriesByUser)
router.post('/', authenticate, controllers.entries.createEntry)
router.delete('/', authenticate, controllers.entries.deleteEntries)

export default router