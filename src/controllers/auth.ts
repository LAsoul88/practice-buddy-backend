import { Request, Response } from 'express'
import { User } from '../db/models'
import bcrypt from 'bcrypt'
import { generateToken } from '../helpers/authenticate'

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

    return res
      .cookie('accessToken', generateToken(foundUser, 'access'), { httpOnly: true })
      .cookie('refreshToken', generateToken(foundUser, 'refresh'), { httpOnly: true })
      .status(200)
      .send({ user: foundUser, redirect: `http://localhost:3000/journal/${foundUser._id}` })
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

    return res
      .status(201)
      .send(user)
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  register
}