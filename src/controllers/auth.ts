import { Request, Response } from 'express'
import { User } from '../db/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req: Request, res: Response) => {
  try {
    const body = await req.body
    const { user, password } = body

    const foundUser = await User.findOne({
      $or: [
        { email: user },
        { username: user }
      ]
    })
    if (!foundUser) return res.send({ error: 'Username or email not found.' })

    const passDoesMatch = await bcrypt.compare(password, foundUser.password)
    if (!passDoesMatch) return res.send({ error: 'Password is incorrect.' })
    else {
      const token = jwt.sign({ userId: foundUser._id }, 'your-secret-key', { expiresIn: '1h' })
      return res.send({ user: foundUser, token, status: 200 })
    }
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