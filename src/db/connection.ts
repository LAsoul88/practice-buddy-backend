import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI || ''
mongoose.connect(uri)

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to practice-buddy db`)
})

mongoose.connection.on('error', (error) => {
  console.log('Mongoose connection error', error)
})

mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose disconnected`)
})