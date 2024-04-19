import { DocumentSetOptions, Document } from 'mongoose'
import UserModel, { UserDocument } from '../models/user.model'

export async function createUser(input: Document<UserDocument>) {
  try {
    return await UserModel.create(input)
  } catch (e: any) {
    throw new Error(e)
  }

  //   const user = await UserModel.create(input)
  //   return user
}
