import { Request, Response } from 'express'
import { Entry } from '../db/models'

const entriesByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const entries = await Entry.find({
      userId: id
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

const updateEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { text } = await req.body
    const updatedEntry = await Entry.updateOne({
      _id: id
    }, {
      text
    })

    return res
      .status(200)
      .send(updatedEntry)
  } catch (error) {
    console.log(error)
  }
}

const deleteEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedEntry = await Entry.deleteOne({ _id: id })

    return res
      .status(204)
      .send('entry deleted')
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
  updateEntry,
  deleteEntry,
  deleteEntries
}