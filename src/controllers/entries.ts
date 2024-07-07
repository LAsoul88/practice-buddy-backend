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

export default {
  entriesByUser
}