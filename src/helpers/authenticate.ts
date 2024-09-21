import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

interface User {
	email?: string
	username: string
	password?: string
	_id: Types.ObjectId
}

export const generateToken = (user: User, type: 'access' | 'refresh') => {
	const { username, _id } = user
	const payload: JwtPayload = {
		username,
		_id
	}

	let options = { expiresIn: 60 * 30 }
	if (type === 'refresh') options.expiresIn = 60 * 60 * 24

	const token = jwt.sign(payload, process.env.JWT_SECRET as string, options)
	return token
}

const verifyToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
		return { success: true, data: decoded }
	} catch (error) {
		return { success: false, error }
	}
}

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = await req.cookies?.['accessToken']
	const accessResult = verifyToken(accessToken)

	if (!accessToken || !accessResult.success) {
		console.log('no valid access token')
		const refreshToken = await req.cookies?.['refreshToken']
		const refreshResult = verifyToken(refreshToken)

		if (!refreshToken || !refreshResult.success) {
			console.log('no valid refresh token')
			return res
				.status(401)
				.send({ error: 'No valid tokens present, login required.' })
		}
		
		const { username, _id } = Object.assign({}, refreshResult.data)
		console.log('assigning new access token')
		req.cookies['accessToken'] = generateToken({ username, _id }, 'access')
		console.log('assigning new refresh token')
		req.cookies['refreshToken'] = generateToken({ username, _id }, 'refresh')
		return next()
	}
	next()
}
