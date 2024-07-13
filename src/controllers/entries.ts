import { Request, Response } from 'express'
import { Entry } from '../db/models'

const entriesByUser = async (req: Request, res: Response) => {
  try {
    const entries = await Entry.find({
      user: req.params.user
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
    const entries = await Entry.find({})
    return res.send(entries)
  } catch (error) {
  console.log(error)
 }
}

export default {
  entriesByUser,
  createEntry
}