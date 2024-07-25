import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Login required'})
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.userId = decoded
    next()
  } catch (error) {
    console.log(error)
  }
}