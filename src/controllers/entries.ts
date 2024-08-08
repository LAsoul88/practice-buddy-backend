import { Request, Response } from 'express'
import { Entry } from '../db/models'

const entriesByUser = async (req: Request, res: Response) => {
  try {
    const entries = await Entry.find({
      user: req.params.id
    })
    return res.send(entries)
  } catch (error) {
    console.log(error)
  }
}

const createEntry = async (req: Request, res: Response) => {
  try {
    const body = await req.body
    const entry = await Entry.create({
      ...body
    })
    return res.send(entry)
  } catch (error) {
  console.log(error)
 }
}

const deleteEntries = async (req: Request, res: Response) => {
  try {
    const deleteEntries = await Entry.deleteMany({})
    return res.send('all deleted')
  } catch (error) {
    console.log(error)
  }
}

export default {
  entriesByUser,
  createEntry,
  deleteEntries
}