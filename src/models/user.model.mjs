import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
})

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//* authenticate credentials and return user
userSchema.statics.authenticate = async function (credentials) {
  //* Validate input
  if (!credentials || !credentials.username || !credentials.password) {
    throw new Error('invalid_credentials')
  }

  //* Destructure username and password for readability
  const { username, password } = credentials

  //* Find user by username
  const foundUser = await this.findOne({ username })

  //* Handle user not found gracefully
  if (!foundUser) {
    throw new Error('invalid_credentials') // Avoid revealing specific error
  }

  //* Compare password using a secure hashing algorithm (bcrypt)
  const isPasswordValid = await bcrypt.compare(password, foundUser.password)

  //* Handle invalid password
  if (!isPasswordValid) {
    throw new Error('invalid_credentials') // Avoid revealing specific error
  }

  // Return the authenticated user object
  return foundUser
}

const User = mongoose.model('user', userSchema)

export default User
