import express from 'express'

import { getUserByUsername, createUser } from '../db/users'
import { authentication, random } from '../helpers'

//* Register a new user
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.sendStatus(400)
    }

    const existingUser = await getUserByUsername(username)

    if (existingUser) {
      // Return a 409 Conflict status code
      return res.status(409).json({ message: 'Username already exists. Please choose a different one.' })
    }

    // Generate a random salt for password hashing
    const salt = await random()

    // Create a new user object with hashed password
    const user = await createUser({
      username,
      authentication: {
        salt,
        password: await authentication(salt, password),
      },
    })

    // Save the user to the database
    const newUser = await user.save()

    // Validate the user was created
    if (!newUser || !newUser._id) {
      // Handle failed user creation
      return res.status(500).json({ message: 'Failed to create user.' })
    }

    // Successful registration, return only the saved user's ID
    return res.status(201).json({ id: newUser._id })
  } catch (error) {
    console.error(error) // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' }) // Generic error for unexpected issues
  }
}
