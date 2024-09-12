import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './db/connection'
import routes from './router'
import { generateRoutes } from './helpers/generateRoutes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

const corsConfig = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}

// Middleware
app.use(cors(corsConfig))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  console.log(req.method, req.url)
  console.log('cookies: ', req.cookies)
  next()
})

// generates all routes dynamically
generateRoutes(routes, app)

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server')
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
