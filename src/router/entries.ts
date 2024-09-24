import express from 'express'
import controllers from '../controllers'
import { authenticate } from '../helpers/authenticate'

const router = express.Router()

router.get('/:id', authenticate, controllers.entries.entriesByUser)
router.post('/', authenticate, controllers.entries.createEntry)
router.patch('/:id', authenticate, controllers.entries.updateEntry)
router.delete('/:id', authenticate, controllers.entries.deleteEntry)
router.delete('/', authenticate, controllers.entries.deleteEntries)

export default router