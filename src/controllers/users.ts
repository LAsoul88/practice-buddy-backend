import { Request, Response } from 'express'
import { User } from '../db/models'


const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
    return res.send(users)
  } catch (error) {
    console.log(error)
  }
}

const userById = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id)
    return res.send(user)
	} catch (error) {
		console.log(error)
	}
}

const createUser = async (req: Request, res: Response) => {
  try {
    const body = await req.body
    const user = await User.create({
      ...body
    })
    return res.send(user)
  } catch (error) {
    console.log(error)
  }
}

export default { 
  getUsers,
  userById,
  createUser
}