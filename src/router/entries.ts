import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.get('/', controllers.entries.entriesByUser)
router.post('/', controllers.entries.createEntry)
router.delete('/', controllers.entries.deleteEntries)

export default router