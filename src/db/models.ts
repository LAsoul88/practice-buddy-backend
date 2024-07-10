import mongoose, { Schema } from 'mongoose'
const ObjectId = Schema.ObjectId

const userSchema = new Schema({
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
    required: true,
    unique: true
  },
})

const User = mongoose.model('users', userSchema)

const entrySchema = new Schema({
  user: ObjectId,
  text: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
})

const Entry = mongoose.model('entries', entrySchema)

export {
  User,
  Entry
}