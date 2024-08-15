import { Request, Response } from 'express'
import { Entry } from '../db/models'

const entriesByUser = async (req: Request, res: Response) => {
  try {
    const entries = await Entry.find({
      userId: req.params.id
    })
    return res
      .status(200)
      .send(entries)
  } catch (error) {
    console.log(error)
  }
}

const createEntry = async (req: Request, res: Response) => {
  try {
    const { text, userId } = await req.body
    const entry = await Entry.create({
      text,
      userId
    })
    return res
      .status(201)
      .send(entry)
  } catch (error) {
  console.log(error)
 }
}

const deleteEntries = async (req: Request, res: Response) => {
  try {
    const deletedEntries = await Entry.deleteMany({})
    console.log(deletedEntries)
    return res
      .status(204)
      .send('entries deleted')
  } catch (error) {
    console.log(error)
  }
}

export default {
  entriesByUser,
  createEntry,
  deleteEntries
}