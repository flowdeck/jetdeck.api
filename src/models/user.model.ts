import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document {
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string, userPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.pre<UserDocument>('save', async function (next) {
  const user = this as UserDocument

  if (!user.isModified('password')) {
    return next()
  }

  //* Generate a salt
  const salt = await bcrypt.genSalt(config.get<number>('auth.saltWorkFactor'))

  //* Hash the password
  const hash = await bcrypt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

//* Returns a promise that resolves with true if it matches, and false if it does not
userSchema.methods.comparePassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword).catch((e) => false)
}

const UserModel = mongoose.model('User', userSchema)
export default UserModel

// export default mongoose.model('User', userSchema)
