import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  authentication: {
    //* {select: false} = excludes password from results whenever queries or find operations performed on this model.
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()

export const getUserByUsername = (username: string) => UserModel.findOne({ username })

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessiontToken': sessionToken,
  })
export const getUserById = (id: string) => UserModel.findById(id)

export const createUser = (values: Record<string, any>) => new UserModel(values)

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)
