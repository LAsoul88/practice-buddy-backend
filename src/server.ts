import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import './db/connection'
import routes from './routes'
import { generateRoutes } from './helpers/generateRoutes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

generateRoutes(routes, app)

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server')
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
