import User from '../models/user.model.mjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { expressjwt } from 'express-jwt'
import mongoose, { mongo } from 'mongoose'

// Load environment variables
dotenv.config()

// handle errors
const handleErrorObj = (errObj) => {
  //for now just show the the error summary
  if (errObj.message) {
    return { errorMessage: errObj.message }
  } else {
    return { errorMessage: 'An error occurred' }
  }
}

// Modified middleware for token extraction
const authMiddleware = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  getToken: (req) => req.headers.authorization?.split(' ')[1],
})

// create json web token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  })
}

const authController = {}

authController.createUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.create({ username, password })
    const token = createToken(user._id)

    // Return JWT in the payload now
    res.status(201).json({ token: token, userId: user._id })
  } catch (errObj) {
    const errResp = handleErrorObj(errObj)
    console.log(errResp)
    res.status(400).json(errResp)
  }
}

authController.getUser = async (req, res) => {
  try {
    const userId = req.query.id

    if (!userId) {
      return res.status(400).json({ errorMessage: 'Please provide a user ID' })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' })
    }

    //* Return custom user object
    res.status(200).json({
      id: user._id,
      username: user.username,
    })
  } catch (errObj) {
    const errResp = handleErrorObj(errObj)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

authController.login = async (req, res) => {
  const credentials = req.body

  try {
    const user = await User.authenticate(credentials)
    const token = createToken(user._id)

    // Return JWT in the payload now
    res.status(201).json({ token: token, userId: user._id })
  } catch (errObj) {
    const errResp = handleErrorObj(errObj)
    //Invalid username or password (401 Unauthorized)
    res.status(401).json(errResp)
  }
}

authController.logout = (req, res) => {
  // No more cookie clearing;
  // the token is now frontend responsibility

  res.status(200).json({ message: 'TODO - no action on server' })
}

//delete user
authController.deleteUser = async (req, res) => {
  try {
    const userId = req.query.id

    if (!userId) {
      return res.status(400).json({ errorMessage: 'Please provide a user ID' })
    }

    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({ errorMessage: 'User not found' })
    }

    //* Return 202 (Accepted) for successful deletion
    res.status(202).json({ message: 'User deleted successfully' })
  } catch (errObj) {
    const errResp = handleErrorObj(errObj)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

export default authController
