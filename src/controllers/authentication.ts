import express from 'express'

import { getUserByUsername, createUser } from '../db/users'
import { getHashedPassword, random } from '../helpers'

interface Authentication {
  salt: string
  password: string
  token?: string
}

interface User {
  username: string
  authentication: Authentication
}

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

    // Create a new user object with hashed password (type assertion)
    const user: User = {
      username,
      authentication: {
        salt,
        password: await getHashedPassword(salt, password),
      },
    }

    // Save the user to the database
    // TODO: Decide where the user creation code should live, for now it's here
    //* NOTE - createUser is a function that takes a user object and returns a new user object (it doesn't save the user to the database)
    const newUser = await createUser(user)

    //* Save the user to the database
    newUser.save()

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

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.sendStatus(400)
    }

    const user = await getUserByUsername(username).select('+authentication.salt +authentication.password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // TODO: For now for typescript to not complain, we need to assert the user type
    if (!user.authentication || !user.authentication.salt) {
      return res.status(500).json({ message: 'invalid user' })
    }

    // Get the hash of the user's password
    const expectedHash = await getHashedPassword(user.authentication.salt, password)

    // Check if the password is correct
    if (user.authentication.password !== expectedHash) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    // Generate a new session token
    const salt = await random()
    user.authentication.sessionToken = await getHashedPassword(salt, user._id.toString())

    await user.save()

    res.cookie('jetdeck-auth', user.authentication.sessionToken, { domain: 'localhost', path: '/' })

    return res.status(200).json(user).end()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
