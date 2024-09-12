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

    const accessToken = generateToken(foundUser, 'access')
    const refreshToken = generateToken(foundUser, 'refresh')

    return res
      .status(200)
      .send({ user: { username: foundUser.username, _id: foundUser._id }, accessToken, refreshToken })
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

    const accessToken = generateToken(user, 'access')
    const refreshToken = generateToken(user, 'refresh')

    return res
      .status(201)
      .send({ user: { username: user.username, _id: user._id }, accessToken, refreshToken })
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  register
}