import express from 'express'
import { getUsers, deleteUserById } from '../db/users'

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  const users = await getUsers()

  return res.status(200).json({ users })
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    // Attempt to delete the user
    await deleteUserById(id)

    // User deleted successfully, return 204 No Content
    return res.status(200)
  } catch (error) {
    console.error(error) // Log the error for debugging

    // Handle potential errors during deletion (e.g., user not found)
    return res.status(404).json({ message: 'User could not be deleted' })
  }
}
