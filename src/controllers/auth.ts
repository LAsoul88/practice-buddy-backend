import { Request, Response } from 'express'
import { User } from '../db/models'
import bcrypt from 'bcrypt'

const login = async (req: Request, res: Response) => {
  try {
    const body = await req.body
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
    const { email, username, password } = await req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      username,
      password: hashedPassword
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