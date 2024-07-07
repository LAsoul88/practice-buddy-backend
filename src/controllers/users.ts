import { Request, Response } from 'express'
import { User } from '../db/models'

const userById = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id)
    return res.send(user)
	} catch (error) {
		console.log(error)
	}
}

export default { 
  userById
}