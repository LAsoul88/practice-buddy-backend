import { Request, Response } from 'express'
import { User } from '../db/models'

const login = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const { email, password } = body

    const user = await User.findOne({
      email: email
    })
    
    if (user?.password !== password) return res.send({ error: 'Password does not match' })
    else return res.send({ user, status: 200 })
  } catch (error) {
    console.log(error)
  }
}

const register = async (req: Request, res: Response) => {
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
  login,
  register
}