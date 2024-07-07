import { Schema } from 'mongoose'
const ObjectId = Schema.ObjectId

const JournalEntry = new Schema({
  user: ObjectId,
  entry: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
})

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
})

module.exports = {
  JournalEntry,
  User
}