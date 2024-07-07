import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.get('/entries', controllers.entries.entriesByUser)

export default router