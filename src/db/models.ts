import mongoose, { Schema } from 'mongoose'
const ObjectId = Schema.ObjectId

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

const User = mongoose.model('users', userSchema)

const entrySchema = new Schema({
  userId: ObjectId,
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