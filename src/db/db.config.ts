import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_PW || ''

const client = new MongoClient(uri)

let db: Db
const connectToDb = async () => {
	if (db) return db
	try {
		db = client.db('practice-buddy')
		return db
	} finally {
		await client.close()
	}
}

export default connectToDb
